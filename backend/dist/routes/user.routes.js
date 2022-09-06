"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("../controllers/user.controller");
var express_1 = __importDefault(require("express"));
var authJwt_middleware_1 = require("../middleware/authJwt-middleware");
var userRouter = express_1.default.Router();
userRouter.route('/search').get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_controller_1.UserController().search);
userRouter.route('/getUser').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_controller_1.UserController().getUser);
userRouter.route('/getUserByUsername').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_controller_1.UserController().getUserByUsername);
userRouter.route('/add').post(function (req, res) {
    new user_controller_1.UserController().add(req, res);
});
userRouter.route('/change').put(function (req, res) {
    new user_controller_1.UserController().change(req, res);
});
userRouter.route('/cookie-test').get(function (req, res) {
    res.status(200).send({ message: 'Hello from route that tests cookies' });
});
userRouter.use(function (req, res, next) {
    console.log("set headers in res");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});
//middlewares are called in [] brackets 
userRouter.route('/usr').get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_controller_1.UserController().userBoard);
userRouter.route('/mod').get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken,
    new authJwt_middleware_1.AuthJwtMiddleware().moderatorRoutesGuard], new user_controller_1.UserController().moderatorBoard);
userRouter.route('/admin').get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken,
    new authJwt_middleware_1.AuthJwtMiddleware().adminRoutesGuard], new user_controller_1.UserController().adminBoard);
userRouter.route('/all').get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_controller_1.UserController().get_all);
//public routes don't need jwt and can be accessed by anyone 
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map