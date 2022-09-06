"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_controller_1 = require("../controllers/post.controller");
var express_1 = __importDefault(require("express"));
var authJwt_middleware_1 = require("../middleware/authJwt-middleware");
var upload_config_1 = __importDefault(require("../config/upload.config"));
var postRouter = express_1.default.Router();
postRouter.get("/files/:name", new post_controller_1.PostController().downloadPostImage);
postRouter.route('/addPost').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken,
    upload_config_1.default.single('image')], new post_controller_1.PostController().addPost);
postRouter.route('/getAll').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().getAll);
postRouter.route('/addComment').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().addComment);
postRouter.route('/addReaction').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().addReaction);
postRouter.route('/getReaction').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().getReaction);
postRouter.route('/getTimeline').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().getTimelinePosts);
postRouter.route('/getCommentsAndReactions').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new post_controller_1.PostController().getCommentsAndReactions);
exports.default = postRouter;
//# sourceMappingURL=post.routes.js.map