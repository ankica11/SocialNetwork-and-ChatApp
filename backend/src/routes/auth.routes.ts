import { AuthController } from "../controllers/auth.controller";
import express from "express";
import { Request, Response } from "express";
import { signin_validation, signup_validation, validateUsername } from "../middleware/validation";
import {usernameCheck} from '../middleware/verify-signup'
import { AuthJwtMiddleware } from "../middleware/authJwt-middleware";
const authRouter = express.Router();

authRouter.use((req: Request, res: Response, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-refresh-token, Origin, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});
//we added server side validation as middleware function
authRouter.route("/signin").post([signin_validation], new AuthController().signin);

authRouter.route("/refreshToken").post(new AuthController().refreshToken);

authRouter.route("/signup").post([signup_validation, usernameCheck], new AuthController().signup);

authRouter.route("/signup/validateUsername").post(validateUsername)
authRouter.route("/signout").post((req: Request, res: Response) => {
  new AuthController().signout(req, res);
});

authRouter.route("/exsistingUserSession").get(
    [new AuthJwtMiddleware().verifyJwtToken],
    new AuthController().getExistingUserSession);

authRouter.route("/goOffline").post( new AuthController().goOffline);

export default authRouter;
