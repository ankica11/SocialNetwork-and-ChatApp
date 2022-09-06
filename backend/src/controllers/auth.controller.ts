import { User } from "../entity/user.entity";
import express from "express";
import { Request, Response } from "express";
import appDataSource from "../config/data-source";
import bcrypt from "bcrypt";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { UserSession } from "../entity/session.entity";
import { UserSessionDAO } from "../DAO/sessions.dao";
import { maxHeaderSize } from "http";

export class AuthController {
  signin = (req: express.Request, res: express.Response) => {
    console.log("signin controller");
    let user: User;
    const username = req.body.username;
    const password = req.body.password;

    //find user by username
    appDataSource
      .getRepository(User)
      .findOne({
        where: {
        username: username},
        relations: {
          user_info: true
        }
      })
      .then((resultUser: User) => {
        user = resultUser;
        let message: string;
        //username doesn't exist case/user not found
        if (!resultUser) {
          //messages shoul be wague
          message = "Username or password is wrong.";
          return res.status(404).send({ message: message });
        }
        //if username exists check for password
        const passwordHashVerify = bcrypt.compareSync(
          password,
          resultUser.password
        );
        if (!passwordHashVerify) {
          //if password is wrong return response with status code 401-bad request
          message = "Username or password is wrong.";
          return res.status(404).send({ message: message });
        }
        //jwt authentication and authorization
        //create token that will be sent to back to user
        //jwt = header.payload.sign
        //it's bad practice to put confidental data like passwords
        //in payload cuz payload is only base64 encoded not encrypted
        //and it's part of http header

        //creating access jwt token
        const payload = { id: resultUser.id }; //this is what is signed
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: parseInt(process.env.ACCESS_JWT_EXP),
        }); //token expires in one hour after that time token will be dismissed
        //creating refresh token/ session adding new session to db
        //console.log(process.env.ACCESS_JWT_EXP)
        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP),
        });
        let expirationDate = new Date();
        expirationDate.setSeconds(
          expirationDate.getSeconds() +
            parseInt(process.env.REFRESH_TOKEN_EXP) -
            expirationDate.getTimezoneOffset() * 60
        );
        
        let userSession = new UserSession();
        userSession.refreshToken = refreshToken;
        userSession.expires_at = expirationDate;
        userSession.lastAccessedAt = new Date()
        userSession.online = true
        resultUser.user_session = userSession;
        appDataSource
          .getRepository(User)
          .save(resultUser)
          .then((data) => {
            //user is successfully updated connected with its session and new session is created

            //seting token in cookie session
            //req.session.token = token;
            res.cookie("auth-access-token", token, {
              maxAge: parseInt(process.env.COOKIE_ACCESS_JWT_EXP),
              httpOnly: true,
              domain: "localhost",
            });
            //everything is okay login the user
            message = "Successfully signed in!";
            //setting refresh token to cookie
            res.cookie("auth-refresh-token", refreshToken, {
              maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_EXP),
              httpOnly: true,
              domain: "localhost",
              path: "/api/auth/",
            });
            
            res.status(200).send({
              message: message,
              user: resultUser,
              //refreshToken: refreshToken
              //accessToken: token
            });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch((err) => {
        //promise rejected - internal server error status code 500
        //so basically this is 3rd line of defense of validation
        //if client side validation or server side validation fail
        //then we have db validation, in terms that db contstraint like
        //not null column need to be satisfied
        res.status(500).send({ message: err.message });
      });
  };

  refreshToken = async (req: Request, res: Response) => {
    console.log("Refresh token");

    //let refreshToken1 = req.header('x-refresh-token')
    let refreshToken = req.cookies["auth-refresh-token"];
    //console.log(refreshToken)
    if (!refreshToken) {
      //only if someone steals access token and make a request with them
      //as part of reply attack
      //console.log(req.session)
      //req.session = null;

      //maybe to delete the session if it exists
      return res
        .status(403)
        .send({ message: "No refresh token provided. Unauthorized." });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          let message = "Altered token signing you out.";
          //error will be thrown if refresh token has expired
          //or refresh token is altered
          
          if (err instanceof TokenExpiredError) {
            message = "Refresh token expired. Sigining you out.";
          }
          //console.log(message)
          //console.log(req)
          res.clearCookie("auth-refresh-token", {
            domain: "localhost",
            path: "/api/auth/",
          });
          res.clearCookie("auth-access-token", {
            domain: "localhost",
          });
          //req.session = null;
          return new UserSessionDAO()
            .deleteSession(refreshToken)
            .then((data) => {
              //console.log(data);
              return res.status(403).send({ message: message });
            });
        }

        //evrything is okay refresh token is ok
        //then create new access token
        //@ts-ignore
        let payload = { id: decoded.id };
        let newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: parseInt(process.env.ACCESS_JWT_EXP),
        });
        //saving new access token to cookie session request object
        //server will automatically set set-cookie response header to
        //new access token
        //req.session.token = newAccessToken;
        res.cookie("auth-access-token", newAccessToken, {
          maxAge: parseInt(process.env.COOKIE_ACCESS_JWT_EXP),
          httpOnly: true,
          domain: "localhost",
        });
        return res.status(200).send({
          refreshToken: refreshToken,
        });
      }
    );
  };

  signup = async (req: Request, res: Response) => {
    //sign up logic
    console.log("Signup controller...")
    try{
      let user = new User()
      user.name = req.body.name
      user.email = req.body.email
      user.username = req.body.username
      user.password = bcrypt.hashSync(req.body.password, 8)
      const result = await appDataSource.getRepository(User).save(user)
      return res.status(200).send({message: 'success'})
    }catch(err){
      return res.status(500).send({message: err.message})
    }
    
  };

  signout = async (req: Request, res: Response) => {
    console.log("Volunatary sign out")
    //signout
    //invalidate session
    //volluntaryy sign out
    let refreshToken = req.cookies["auth-refresh-token"];
    res.clearCookie("auth-refresh-token", {
      domain: "localhost",
      path: "/api/auth/",
    });
    res.clearCookie("auth-access-token", {
      domain: "localhost",
    });
    //req.session = null;
    return new UserSessionDAO()
      .deleteSession(refreshToken)
      .then((data) => {
        //console.log(data);
        return res.status(200).send({ message: "Signin out" });
      })
      .catch((err)=>{
        console.log(err)
        return res.sendStatus(500)
      })
}

getExistingUserSession = async (req: Request, res: Response) => {
  console.log('getting existing user session')
  //need to get the user through his session
try{
  
  

  const loggedUser = await appDataSource.getRepository(User).findOne({
    where: {
      user_session: {
        refreshToken: req.cookies["auth-refresh-token"]
      }
    },
    relations: {
      user_info: true,
      user_session: true
    }
  })

  loggedUser.user_session.lastAccessedAt = new Date()
  loggedUser.user_session.online = true
  const result = await appDataSource.getRepository(User).save(loggedUser)

  //console.log(result)


  return res.status(200).send({success: true, user: loggedUser})
}catch(err){
  console.log(err.message)
  return res.status(500).send({success: false, message: err.message})
}
}

goOffline = async (req: Request, res: Response) =>{
  try{

    const userId = parseInt(req.body.userId)
    const userSession = await appDataSource.getRepository(UserSession).findOne({
      where:{
        user: {
          id: userId
        }
      }
    })

    userSession.online = false
    userSession.lastAccessedAt = new Date()
    const result = await appDataSource.getRepository(UserSession).save(userSession)
    return res.status(200).send({result: result})

  }catch(err){
    console.log(err.message)
    return res.sendStatus(500)
  }
}

}
