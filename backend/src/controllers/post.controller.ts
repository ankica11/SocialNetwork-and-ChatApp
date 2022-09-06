import appDataSource from "../config/data-source"
import { Request, Response } from "express"
import { User } from "../entity/user.entity"
import { Post } from "../entity/post.entity"
import { Comment } from "../entity/comment.entity"
import { Reaction } from "../entity/reaction.entity"


export class PostController{

    getReaction = async (req: Request, res: Response) => {
        console.log('getting reaction...')
        try{
            const postId = parseInt(req.body.postId)
            const userId = parseInt(req.body.userId)

            const reaction = await appDataSource.getRepository(Reaction).findOne({
                where: {
                   user: {
                    id: userId
                   },
                   post: {
                    id: postId
                   }
                }
            })

            res.status(200).send({reaction:reaction})

            
            

        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }

    addReaction = async (req: Request, res: Response) => {
        console.log('adding reaction...')
        try{
            const postId = parseInt(req.body.postId)
            const userId = parseInt(req.body.userId)

            const user = await appDataSource.getRepository(User).findOneBy({id: userId})
            const post = await appDataSource.getRepository(Post).findOneBy({id: postId})

            if(user != null && post != null){
            const existing_reaction = await appDataSource.getRepository(Reaction).findOne({
                where: {
                    post: {
                        id: postId
                    },
                    user: {
                        id: userId
                    }

                }
            })
            if(existing_reaction){
                const result = await appDataSource.getRepository(Reaction).remove(existing_reaction)
            }
            const reaction = new Reaction()
            reaction.reaction = req.body.reaction
            reaction.user = user
            reaction.post = post
            const addedReaction = await appDataSource.getRepository(Reaction).save(reaction)
            console.log(req.body.reaction)
            return res.status(200).send({result: addedReaction})
            }else{
               return res.sendStatus(404)

            }

            
            

        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }


    addComment = async (req: Request, res: Response) => {
        console.log('adding comment...')
        try{
            const postId = parseInt(req.body.postId)
            const userId = parseInt(req.body.userId)

            const user = await appDataSource.getRepository(User).findOneBy({id: userId})
            const post = await appDataSource.getRepository(Post).findOneBy({id: postId})

            if(user != null && post != null){
            const comment = new Comment()
            comment.text = req.body.commentText
            comment.user = user
            comment.post = post
            const addedComment = await appDataSource.getRepository(Comment).save(comment)

            return res.status(200).send({result: addedComment})
            }else{
               return res.sendStatus(404)

            }

            
            

        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }

    downloadPostImage = (req, res) => {
        //console.log('downloading post image...')
        const fileName = req.params.name
        const directoryPath =  "./resources/static/assets/uploads/";
        res.download(directoryPath + fileName, fileName, (err)=>{
            if(err){
               res.status(404).send({success: false})
            }

        })

    }

    addPost = async (req: Request, res: Response) => {
        console.log("adding post")

        try{

            const userId = parseInt(req.body.userId)
            const user = await appDataSource.getRepository(User)
                                            .findOneBy({id: userId})
            const post = new Post()
            post.text = req.body.postText
            post.audience = req.body.audience
           // post.link = req.body.link
            if(req.file){
            const postImageURL = "http://localhost:3000/api/posts/files/" + req.file.originalname
           
            post.photo = postImageURL
            }
            post.user = user
            
            const addedPost = await appDataSource.getRepository(Post)
                                              .save(post)
            const post_result = await appDataSource.getRepository(Post).findOne({
                where: {
                    id: addedPost.id
                },
                relations: {
                    comments: {
                        user: true},
                    reactions: {
                        user: true}
                }
            })
            res.status(200).send({message: 'added post', 
                                 addedPost: post_result})

        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }


    }

    getAll = async (req: Request, res:Response)=>{
        console.log('getting all users posts...')
        try{

            const userId = parseInt(req.body.userId)
            const posts = await appDataSource.getRepository(Post)
                                             .find(
                                                {
                                                    relations: {
                                                        user:true,
                                                        comments: {
                                                            user: true},
                                                        reactions: {
                                                            user: true}
                                                    },
                                                    where:{
                                                        user: {
                                                            id: userId
                                                        }
                                                    },
                                                    order: {
                                                        created_at: "DESC",
                                                        comments: {created_at: "ASC"}
                                                    }
                                                }
                                             )
            return res.status(200).send({myPosts: posts})

        }catch(err){
            console.log(err)
            res.status(500).send(err.message)
        }
    }


    getTimelinePosts = async (req: Request, res: Response) => {
        console.log('loading timeline...')
        try{
            const loggedUserId = parseInt(req.body.loggedUserId)
            const sqlQuery = "select distinct post.*, user.name, user.username, user.avatar from post\n" +
            "inner join friends on (userId = senderFriendId or userId=receiverFriendId) inner join user on (userId = user.id)\n" +
            "where (senderFriendId = ? or receiverFriendId = ?) and accepted = true and audience != 'private'\n" +
            "order by post.created_at DESC"
            const result = await appDataSource.manager.query(sqlQuery, [loggedUserId, loggedUserId])

            return res.status(200).send({timeline: result})
        }catch(err){
            console.log(err)
            res.status(500).send(err.message)
        }
    }

    getCommentsAndReactions = async (req: Request, res: Response) => {
        try{
            const postId = parseInt(req.body.postId)
            const reactions = await appDataSource.getRepository(Reaction).find({
                where: {
                    post: {
                        id: postId
                    }
                },
                relations: {
                    user: true
                }
            })
            const comments = await appDataSource.getRepository(Comment).find({
                where: {
                    post: {
                        id: postId
                    }
                },
                relations: {
                    user: true
                }
            })

            return res.status(200).send({reactions: reactions, comments: comments})

        }catch(err){
            console.log(err)
            res.status(500).send(err.message)
        }
    }
}