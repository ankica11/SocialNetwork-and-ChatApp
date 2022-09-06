import { UserController } from '../controllers/user.controller';
import express from 'express'
import {Request, Response} from 'express'
import { AuthJwtMiddleware } from '../middleware/authJwt-middleware';


const userRouter = express.Router();



userRouter.route('/search').get(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserController().search
)

userRouter.route('/getUser').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserController().getUser
)

userRouter.route('/getUserByUsername').post(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserController().getUserByUsername
)


userRouter.route('/add').post(
    (req: Request, res: Response) => {
        new UserController().add(req, res)
    }
)

userRouter.route('/change').put(
    (req: Request, res: Response) => {
        new UserController().change(req, res)
    }
)
userRouter.route('/cookie-test').get(
    (req: Request, res: Response) => {
        
        res.status(200).send({message: 'Hello from route that tests cookies'})
    }
)
userRouter.use((req, res, next) => {
    console.log("set headers in res")
    res.header("Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept")
    next()
})
//middlewares are called in [] brackets 
userRouter.route('/usr').get(
    [new AuthJwtMiddleware().verifyJwtToken],
     new UserController().userBoard
)

userRouter.route('/mod').get(
    [new AuthJwtMiddleware().verifyJwtToken,
     new AuthJwtMiddleware().moderatorRoutesGuard],
     new UserController().moderatorBoard
)

userRouter.route('/admin').get(
    [new AuthJwtMiddleware().verifyJwtToken,
     new AuthJwtMiddleware().adminRoutesGuard],
     new UserController().adminBoard
)

userRouter.route('/all').get(
    [new AuthJwtMiddleware().verifyJwtToken],
    new UserController().get_all
)

//public routes don't need jwt and can be accessed by anyone 


export default userRouter
