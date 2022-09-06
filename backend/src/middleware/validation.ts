import joi from "joi";
import express from "express";
import appDataSource from "../config/data-source";

import { User } from "../entity/user.entity";

const signin_validation = (req: express.Request, res: express.Response, next) => {
  console.log("signin validation middleware");
  const schema = joi.object({
    username: joi.string().required(),

    password: joi.string().required().min(3),
  });

  //it will return object like {error: {}, value:{}}
  const { error } = schema.validate({
    username: req.body.username,
    password: req.body.password,
  });
  //if validation error happend notify the user and send back response
  //without forwarding request to controller
  //we will not call the next cuz we won't to break the chain
  if (error) {
    //401 status for bad request
    //maybe we should set session to null
   // req.session = null;
    return res
      .status(400)
      .send({
        message: {
          msg_text: "Validation error: " + error.details[0].message,
          type: error.details[0].path,
        },
      });
  }
  //only if validation is passed handle the request to the next
  //function in middleware array or if there's no such
  //handle the requesst to endpoint controller
  next();
};

const signup_validation = (req:express.Request, res:express.Response, next) => {
  console.log("Signup validation middleware...")
  const schema = joi.object({
    username: joi.string()
                 .required()
                 .alphanum(),

    password: joi.string()
                 .required()
                 .pattern(new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')),
    confirmPassword: joi.ref('password'),
    email: joi.string()

              .email({minDomainSegments: 2})
              .required(),
    name: joi.string()
                  .required()
    
  })
  .with('password', 'confirmPassword')

  const {error} = schema.validate(req.body)
  if(error){
    //console.log(error)
    return res.status(400).send({
      message: {
        msg_text: "Validation error: " + error.details[0].message,
        type: error.details[0].path,
      },
    })
  }

  next()




};


const validateUsername = async (req,res,next)=>{
  console.log("Username validation endpoint")
  const username = req.body.username
  try{
      const user = await appDataSource.getRepository(User).findOneBy({
          username: username
      })
      if(user){
          return res.status(200).send({exists: true})
      }

      //okay you may continue
      return res.status(200).send({exists: false})

  }catch(err){
      console.log(err)
      return res.status(500).send({message: err.message})
  }

}

export { signin_validation, signup_validation, validateUsername };
