import { PostController } from '../controllers/post.controller'
import express from 'express'
import { AuthJwtMiddleware } from '../middleware/authJwt-middleware'
import upload from '../config/upload.config'

const postRouter = express.Router()

postRouter.get("/files/:name", new PostController().downloadPostImage)

postRouter.route('/addPost').post(
    [new AuthJwtMiddleware().verifyJwtToken,
    upload.single('image')],
    new PostController().addPost
)
postRouter.route('/getAll').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().getAll
)

postRouter.route('/addComment').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().addComment
)

postRouter.route('/addReaction').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().addReaction
)

postRouter.route('/getReaction').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().getReaction
)

postRouter.route('/getTimeline').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().getTimelinePosts
)

postRouter.route('/getCommentsAndReactions').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new PostController().getCommentsAndReactions
)
export default postRouter