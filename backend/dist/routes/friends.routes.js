"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var friends_controller_1 = require("../controllers/friends.controller");
var express_1 = __importDefault(require("express"));
var authJwt_middleware_1 = require("../middleware/authJwt-middleware");
var friendsRouter = express_1.default.Router();
friendsRouter.route('/getFOF').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().getFriendsOfFriends);
friendsRouter.route('/getSuggestions').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().getSuggestions);
friendsRouter.route('/checkFriendsStatus').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().checkFriendsStatus);
friendsRouter.route('/addFriend').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().addFriend);
friendsRouter.route('/getSentRequests').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().getSentRequests);
friendsRouter.route('/deleteRequest').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().deleteRequest);
friendsRouter.route('/getFriendRequests').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().getFriendRequests);
friendsRouter.route('/acceptRequest').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().acceptRequest);
friendsRouter.route('/denyRequest').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().denyRequest);
friendsRouter.route('/getFriends').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().getFriends);
friendsRouter.route('/removeFriend').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new friends_controller_1.FriendsController().removeFriend);
exports.default = friendsRouter;
//# sourceMappingURL=friends.routes.js.map