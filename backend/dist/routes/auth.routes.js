"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("../controllers/auth.controller");
var express_1 = __importDefault(require("express"));
var validation_1 = require("../middleware/validation");
var verify_signup_1 = require("../middleware/verify-signup");
var authJwt_middleware_1 = require("../middleware/authJwt-middleware");
var authRouter = express_1.default.Router();
authRouter.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-refresh-token, Origin, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
//we added server side validation as middleware function
authRouter.route("/signin").post([validation_1.signin_validation], new auth_controller_1.AuthController().signin);
authRouter.route("/refreshToken").post(new auth_controller_1.AuthController().refreshToken);
authRouter.route("/signup").post([validation_1.signup_validation, verify_signup_1.usernameCheck], new auth_controller_1.AuthController().signup);
authRouter.route("/signup/validateUsername").post(validation_1.validateUsername);
authRouter.route("/signout").post(function (req, res) {
    new auth_controller_1.AuthController().signout(req, res);
});
authRouter.route("/exsistingUserSession").get([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new auth_controller_1.AuthController().getExistingUserSession);
authRouter.route("/goOffline").post(new auth_controller_1.AuthController().goOffline);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map