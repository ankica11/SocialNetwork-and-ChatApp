import appDataSource from "../config/data-source";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { User } from "../entity/user.entity";
import express from "express";

export class AuthJwtMiddleware {
  //middleware function that is called before every access to user routes
  verifyJwtToken = (req: express.Request, res, next) => {
    console.log("verify jwt token");
    //console.log(process.env.ACCESS_JWT_EXP)
    //scenario1. storing jwt token inside htttp header and retrieving it from http header
    //let token = req.headers['x-access-token']
    //console.log("token: ", token)

    //sceanrio2. storing jwt token inside cookie session and retrieving it from cookie session
    //let token = req.session.token;
    let token = req.cookies["auth-access-token"]
    if (!token) {
      return res.status(401).send({ message: "No access token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //when token expires
        if (err instanceof TokenExpiredError) {
          return res.status(401).send({ message: "Access token expired" });
        }
        //altered access token
        return res.status(401).send({ message: "Unauthorized!" });
      }
      //???? why do we need this for fuck sake?????
      //@ts-ignore
      req.id = decoded.id;

      next();
    });
  };

  adminRoutesGuard = (req, res, next) => {
    console.log("admin routes guard");
    appDataSource
      .getRepository(User)
      .findOneBy({
        id: req.id,
      })
      .then((user: User) => {
        let hasAdminAuthorities = false;
        for (let i = 0; i < user.roles.length; i++) {
          if ((hasAdminAuthorities = user.roles[i] == "admin")) {
            //user has authorities to access the route
            //just call another middleware function in queue
            //or if there are none of these pass the request object to endpoint handler
            next();
            return;
          }
        }

        //user doesn't have admin privileges to access restricted route

        return res.status(403).send({
          message: "Restricted access! Requires admin role.",
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Unable to validate user role." });
      });
  };

  moderatorRoutesGuard = (req, res, next) => {
    console.log("moderator routes guard");
    appDataSource
      .getRepository(User)
      .findOneBy({
        id: req.id,
      })
      .then((user: User) => {
        let hasModeratorAuthorities = false;
        for (let i = 0; i < user.roles.length; i++) {
          //if user have moderator or admin role he can access
          //moderator routes if we approach to admin privileges
          //as superset of moderator privilleges and moderator privileges as
          //super setcof user privilleges
          //but there can be different model if we look at moderator
          //to be separate role not subset of admin role
          //in terms that moderator can access the routes that admin can't
          //and vice versa
          if (
            (hasModeratorAuthorities =
              user.roles[i] === "moderator" || user.roles[i] === "admin")
          ) {
            next();
            return;
          }
        }
        return res.status(403).send({
          message: "restricted access! Requires moderator role.",
        });
      })
      .catch((err) => {
        //if promise is rejected
        return res.status(500).send({
          message: "Unable to validate user role.",
        });
      });
  };
}
