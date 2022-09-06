import { FriendsController } from '../controllers/friends.controller';
import express from 'express'; 
import {Request, Response} from 'express'
import { AuthJwtMiddleware } from '../middleware/authJwt-middleware';


const friendsRouter = express.Router()

friendsRouter.route('/getFOF').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new FriendsController().getFriendsOfFriends
)

friendsRouter.route('/getSuggestions').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new FriendsController().getSuggestions
)

friendsRouter.route('/checkFriendsStatus').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().checkFriendsStatus
 )

friendsRouter.route('/addFriend').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().addFriend
 )

 friendsRouter.route('/getSentRequests').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().getSentRequests
 )

 friendsRouter.route('/deleteRequest').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new FriendsController().deleteRequest
)

 friendsRouter.route('/getFriendRequests').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().getFriendRequests
 )

 friendsRouter.route('/acceptRequest').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().acceptRequest
 )

 friendsRouter.route('/denyRequest').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().denyRequest
 )
 friendsRouter.route('/getFriends').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().getFriends
 )


 friendsRouter.route('/removeFriend').post(
    [new AuthJwtMiddleware().verifyJwtToken],
     new FriendsController().removeFriend
 )

 export default friendsRouter