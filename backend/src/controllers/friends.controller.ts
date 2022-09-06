import appDataSource from "../config/data-source";
import express from "express";
import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { Friends } from "../entity/friends.entity";
import { request } from "node:http";
import { notEqual } from "node:assert";

export class FriendsController{

    checkFriendsStatus = async (req: Request, res: Response) => {
      console.log("checking if friends...")
      try{

        const loggedUserId = parseInt(req.body.loggedUserId)
        const userId = parseInt(req.body.userId)
        
        const result = await appDataSource.getRepository(Friends).findOne({
          where:[
            {senderFriendId: loggedUserId, receiverFriendId: userId},
            {senderFriendId: userId, receiverFriendId: loggedUserId}
          ]
        })

        
        return res.status(200).send({res: result})
      }catch(err){

        res.status(500).send({message: err.message})

      }
    }

    addFriend = async (req: Request, res: Response) => {
        console.log("Adding friends...")
    try{
      
      const senderId = parseInt(req.body.senderId)
      const receiverId = parseInt(req.body.receiverId)
      const friendSender = await appDataSource.getRepository(User).findOne({
        where:
            {id: senderId}
        
      })
      const friendReceiver = await appDataSource.getRepository(User).findOne({
        where:
            {id: receiverId}
        
      })

      
      const newFriends = new Friends()
      newFriends.senderFriend=friendSender
      newFriends.receiverFriend=friendReceiver
      const result = await appDataSource.getRepository(Friends).save(newFriends)
      res.status(200).send({message: "Request sent"})


    }catch(err){
      console.log(err)
      res.sendStatus(500)
    }

    }

    getSentRequests = async (req: Request, res: Response) => {
        console.log("Getting sent requests...")
    try{
      //get sent request for user
      const id = parseInt(req.body.userId)
      
      const sentRequests = await appDataSource.getRepository(Friends).find({
        where: [
          {
            senderFriendId: id,
            accepted: false
          }
        ],
        relations: {
          receiverFriend: {
            user_info: true
          }
        },
        order: {
          updated_at: "ASC"
        }
      })
                                      
      
      res.status(200).send({sentRequests: sentRequests})

    }catch(err){
      console.log(err)
      res.sendStatus(500)
    }


    }

    getFriendRequests = async(req: Request, res: Response) => {
      console.log('getting friend requests...')
      try{
        
        const id = parseInt(req.body.userId)
        const friendReqs =  await appDataSource.getRepository(Friends).find({
          where: [
            {
              receiverFriendId: id,
              accepted: false
            }
          ],
          relations: {
            senderFriend: {
              user_info: true
            }
          },
          order: {
            updated_at: "ASC"
          }
        })

        res.status(200).send({friendReqs: friendReqs})
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
    }

    getFriends = async (req: Request, res: Response) => {

      console.log('getting friends...')
      try{
        
        const id = parseInt(req.body.userId)
        const friendships = await appDataSource.getRepository(Friends).find({
          where: [
            {
              receiverFriendId: id,
              accepted: true
            },
            {
              senderFriendId: id,
              accepted: true
            }
          ],
          relations: {
            senderFriend: {
              user_info: true,
              user_session: true
              
            },
            receiverFriend: {
              user_info: true,
              user_session: true
            }
          },
          order: {
            updated_at: "ASC"
          }
        })
                                              

        res.status(200).send({friendships: friendships})
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }

    }

    acceptRequest = async (req: Request, res: Response) => {
      console.log("accepting friend request...")
      const loggedUserId = parseInt(req.body.loggedUserId)
      const userId = parseInt(req.body.userId)
      try{
        const friendship: Friends = await appDataSource.getRepository(Friends)
                                              .findOne({
                                                where: {
                                                  senderFriendId: userId,
                                                  receiverFriendId: loggedUserId
                                                }
                                              })
        
        friendship.accepted = true
        const result = await appDataSource.getRepository(Friends).save(friendship)
        res.status(200).send({result: result})                        


      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }


    }

    denyRequest = async (req: Request, res: Response) => {
      console.log("Denying friendship...")
      const loggedUserId = parseInt(req.body.loggedUserId)
      const userId = parseInt(req.body.userId)
      try{
        const friendship: Friends = await appDataSource.getRepository(Friends)
                                              .findOne({
                                                where: {
                                                  senderFriendId: userId,
                                                  receiverFriendId: loggedUserId
                                                }
                                              })
        const result = await appDataSource.getRepository(Friends).remove(friendship)

        res.status(200).send({result: result})



      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }


    }
   

    deleteRequest = async (req: Request, res: Response) => {
      console.log("Deleting friend request...")
      const requestId = parseInt(req.body.requestId)
      
      try{
        const friendship: Friends = await appDataSource.getRepository(Friends)
                                              .findOne({
                                                where: {
                                                  friendsId: requestId
                                                }
                                              })
        const result = await appDataSource.getRepository(Friends).remove(friendship)

        res.status(200).send({result: result})



      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }
    }

    removeFriend = (req: Request, res: Response) => {

    }


    getSuggestions = async (req: Request, res: Response) => {
      console.log('getting suggestions...')
      const userId = parseInt(req.body.userId)
      try{

        //get most recent friend
        
        const mostRecentFriendship: Friends[] = await appDataSource.getRepository(Friends).find({
          where: [
            {senderFriendId: userId},
            {receiverFriendId: userId}
          ],
          
          order: {
            updated_at: "DESC"
          },
          skip: 0,
          take: 1
          
        })

        let friends = []
       if(mostRecentFriendship.length != 0){
        const mostRecentFriendId = mostRecentFriendship[0].senderFriendId == userId ? mostRecentFriendship[0].receiverFriendId : mostRecentFriendship[0].senderFriendId
        friends = await appDataSource.getRepository(Friends).find({
          where: [
            {senderFriendId: mostRecentFriendId},
            {receiverFriendId: mostRecentFriendId}
          ],
          relations: {
            senderFriend: {
              user_info: true
              
            },
            receiverFriend: {
              user_info: true
            }
          },
          order: {
            updated_at: "DESC"
          },
          skip: 0,
          take: 10

        })
       }



        res.status(200).send({result: friends})

      }catch(err){
        res.sendStatus(500)
      }
    }


    getFriendsOfFriends = async (req: Request, res: Response) => {
      console.log('getting friends of friends...')
      try{
        
        const id = parseInt(req.body.userId)
        const sqlQuery = "select distinct u2.*\n" +
        "from friends f1\n" +
        "inner join user u1 on (f1.senderFriendId = u1.id or f1.receiverFriendId = u1.id) and u1.id != ?\n" +
        "inner join friends f2 on(f2.senderFriendId = u1.id or f2.receiverFriendId = u1.id) and f2.senderFriendId <> ? and\n" +
        "f2.receiverFriendId <> ?\n" +
        "inner join user u2 on (f2.senderFriendId = u2.id or f2.receiverFriendId = u2.id) and f2.senderFriendId <> ? and\n" + 
        "f2.receiverFriendId <> ? and u2.id != u1.id and u2.id not in (select u3.id\n" +
        "from friends f3\n" + 
        "inner join user u3 on (f3.senderFriendId = u3.id or f3.receiverFriendId = u3.id) and u3.id != ?\n" +
        "where ? in (f3.senderFriendId, f3.receiverFriendId))\n" +
        "where ? in (f1.senderFriendId, f1.receiverFriendId) and f1.accepted = true and f2.accepted = true\n" +
        "order by f2.updated_at DESC"

        const suggestions: User[] = await appDataSource.manager.query(sqlQuery, [id, id, id, id, id, id, id, id])
        
        return res.status(200).send({suggestions: suggestions})
      }catch(err){
        console.log(err)
        res.sendStatus(500)
      }

    }

}