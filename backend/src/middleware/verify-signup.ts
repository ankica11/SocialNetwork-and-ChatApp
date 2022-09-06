//this will be used for server side validation
//to check if username already exists
import appDataSource from '../config/data-source'
import express from 'express'
import { Request, Response } from 'express'
import { User } from '../entity/user.entity'

export const usernameCheck = async (req,res,next)=>{
    console.log("Username check middleware")
    const username = req.body.username
    try{
        const user = await appDataSource.getRepository(User).findOneBy({
            username: username
        })
        if(user){
            return res.status(405).send({message: 'Username already exists.'})
        }
        //okay you may continue
        next()

    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }

}