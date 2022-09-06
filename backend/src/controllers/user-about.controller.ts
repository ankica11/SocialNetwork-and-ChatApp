import appDataSource from '../config/data-source'
import express from 'express'
import { Request, Response } from 'express'
import { User } from '../entity/user.entity'
import { UserInfo } from '../entity/user-info.entity'
import { fileURLToPath } from 'node:url'

export class UserAboutController{

    getPhoto = (req, res) => {
        console.log('getting profile photo...')
        const fileName = req.params.name;
        const directoryPath =  "./resources/static/assets/uploads/";
        res.download(directoryPath + fileName, fileName, (err) => {
          if (err) {
            res.download(directoryPath + 'user.jpg', 'user.jpg', (err)=>{
                if(err){
                res.status(500).send({
                  message: "Could not download the file. " + err,
                });
            }
            })
          }
        });
      };

    uploadPhoto = async (req: Request, res: Response)=>{
        console.log('uploading photo...')
        try{

            const profilePhotoURL ="http://localhost:3000/api/user_about/files/" + req.file.originalname
            const username = req.body.username
            //save filenme to db
            const user = await appDataSource.getRepository(User).findOne({
                where: {
                username: username
            },
                relations: {
                    user_info: true
                }
        })
            
            user.avatar = profilePhotoURL
            const result = await appDataSource.getRepository(User).save(user)
            

            res.status(200).send({success: result})

        }catch(err){
            res.sendStatus(500)
        }
    }

    setWorkplace = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const workplace = req.body.workplace

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.workplace = workplace
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.workplace = workplace
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setCollege = async (req:Request, res:Response)=>{
        console.log("setting college for user")
        try{
        const userId = req.body.userId
        const college = req.body.college

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.college = college
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.college = college
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setHighschool = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const highSchool = req.body.highschool

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.highSchool = highSchool
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.highSchool = highSchool
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setCurrentPlace = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const currentPlace = req.body.currentPlace

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.currentPlace = currentPlace
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.currentPlace = currentPlace
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setHometown = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const hometown = req.body.hometown

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.hometown = hometown
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.hometown = hometown
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setRelationshipStatus = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const relationshipStatus = req.body.relationshipStatus

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.relationshipStatus = relationshipStatus
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.relationshipStatus = relationshipStatus
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setGender = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const gender = req.body.gender

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.gender = gender
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.gender = gender
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setInterestedIn = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const interestedIn = req.body.interestedIn

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.interestedIn = interestedIn
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.interestedIn = interestedIn
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setBirthDate = async (req:Request, res:Response)=>{
        console.log("setting birthday for user")
        try{
        const userId = req.body.userId
        const birthDate = new Date(req.body.birthDate)

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.birthDate = birthDate
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.birthDate = birthDate
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setAbout = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const about = req.body.about

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.about = about
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.about = about
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setFaveQuotes = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const favQuotes = req.body.favQuotes

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.favQuotes = favQuotes
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.favQuotes = favQuotes
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setSocialLinks = async (req:Request, res:Response)=>{
        console.log("setting social links for user")
        try{
        const userId = req.body.userId
        const socialLinks = req.body.socialLinks

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.socialLinks = socialLinks
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.socialLinks = socialLinks
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setNickname = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const nickname = req.body.nickname

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.nickname = nickname
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.nickname = nickname
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }


    setPhone = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const phone = req.body.phone

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.phone = phone
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.phone = phone
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }


    setEmail = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const email = req.body.email

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.email = email
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.email = email
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setLanguage = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const language = req.body.language

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.language = language
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.language = language
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    setWebsites = async (req:Request, res:Response)=>{
        console.log("setting workplace for user")
        try{
        const userId = req.body.userId
        const websites = req.body.websites

        const user = await appDataSource.getRepository(User).findOne({
            where: {
            id: userId
            }, 
            relations: {
            user_info: true
        }
    })
       
    if(user.user_info == null){
        let user_info = new UserInfo()
        user_info.website = websites
        user.user_info = user_info

        const result = await appDataSource.getRepository(User).save(user)
        return res.status(200).send({result: user})
    }

    //user_info row for user already exists in database
    user.user_info.website = websites
    const result = await appDataSource.getRepository(User).save(user)
    return res.status(200).send({result: user})




    }catch(err){
        console.log(err)
        return res.status(500).send({message: err.message})
    }
    }

    
}