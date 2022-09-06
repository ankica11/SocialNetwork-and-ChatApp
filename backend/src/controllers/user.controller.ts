import appDataSource from "../config/data-source";
import express from "express";
import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { json } from "body-parser";
import bcrypt from "bcrypt";
import { Friends } from "../entity/friends.entity";

export class UserController {

  search = async (req: Request, res: Response) => {
    console.log('searching for user...')
    try{

      const term = req.query.term as string
      //console.log(term)
      const termArray = term.split(' ')
      let whereQuery=''
      let whereQuery2=''
      let params=[]
      let whereParams={}
      termArray.forEach((item,ind)=>{
          
            if(ind==termArray.length-1){
              whereQuery+=`user.name LIKE :term${ind}`
              whereQuery2+=`name LIKE ?`
            }else{
            whereQuery+=`user.name LIKE :term${ind} OR `
            whereQuery2+=`name LIKE ? OR `
            }
            whereParams['term'+ind]="%"+item+"%"
            params.push("%"+item+"%")
      })
      
      params.push(term)
      const sqlQuery = "SELECT * FROM USER WHERE "+whereQuery2+" ORDER BY instr(name, ?) DESC"
      //console.log(sqlQuery)
      //console.log(params)
      //return res.sendStatus(200)
      const result:User[] = await appDataSource.manager.query(sqlQuery, params)
      /*const searchResults: User[] = await appDataSource.getRepository(User)
                                               .createQueryBuilder("user")
                                               .where(whereQuery, whereParams)
                                               .getMany()*/
      return res.status(200).send({searchResults: result})
                                            

    }catch(err){
      console.log(err)
      return res.status(500).send({message: err.message})
    }
  }

  get_all = async (req: Request, res: Response) => {
    try {
      console.log("get all");
      const users = await appDataSource.getRepository(User).find();
      res.status(200).send({ data: users });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try{
      const userId = req.body.userId
      const user = await appDataSource.getRepository(User).findOne({
        where: {
          id: userId
        },
        relations: {
          user_info: true
        }
      })

      return res.status(200).send({user: user})

    }catch(err){
      console.log(err)
      return res.status(200).send({message: err.message})
    }
  }

  getUserByUsername = async (req: Request, res: Response) => {
    console.log('user by username')
    try{
      const username = req.body.username
      const user = await appDataSource.getRepository(User).findOne({
        where: {
          username: username
        },
        relations: {
          user_info: true,
          posts: {
            comments: {
              user: true
            },
            reactions: {
              user: true
            }
          }
        },
        order: {
          posts: {
            created_at: "DESC",
            comments: {created_at: "ASC"}
            
          }
      }
      })

      return res.status(200).send({user: user})

    }catch(err){
      console.log(err)
      return res.status(200).send({message: err.message})
    }
  }

  //adding new user
  add = async (req: Request, res: Response) => {
    try {
      const user = new User();
      user.username = req.body.username;
      user.password = bcrypt.hashSync(req.body.password, 8);
      user.name = req.body.name
      user.phone = req.body.phone;
      user.email = req.body.email;
      user.avatar = req.body.avatar;
      user.background_photo = req.body.background_photo;
      user.roles = req.body.roles;

      const result = await appDataSource.getRepository(User).save(user);
      res.send(result);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  change = async (req: Request, res: Response) => {
    //changing password test
    console.log("changing password...")
    try {
      let param: string = req.query.id as string;
      const user = await appDataSource
        .getRepository(User)
        .findOneBy({ id: parseInt(param) });
      user.password = bcrypt.hashSync(req.body.password, 8);
      const result = await appDataSource.getRepository(User).save(user);
      res.status(200).send({ message: "Successfully updated!", user: result });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  userBoard = (req, res) => {
    console.log("user board");
    res.status(200).send({ message: "User content" });
  };

  adminBoard = (req, res) => {
    console.log("admin board");
    res.status(200).send("Admin board");
  };

  moderatorBoard = (req, res) => {
    console.log("moderator board");
    res.status(200).send("Moderator board");
  };

  



}
