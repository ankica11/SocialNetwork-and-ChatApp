"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_about_controller_1 = require("../controllers/user-about.controller");
var express_1 = __importDefault(require("express"));
var authJwt_middleware_1 = require("../middleware/authJwt-middleware");
var upload_config_1 = __importDefault(require("../config/upload.config"));
var userAboutRouter = express_1.default.Router();
userAboutRouter.get("/files/:name", new user_about_controller_1.UserAboutController().getPhoto);
userAboutRouter.post('/upload', [new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken,
    upload_config_1.default.single('image')], function (req, res) { return new user_about_controller_1.UserAboutController().uploadPhoto(req, res); });
userAboutRouter.route('/setWebsites').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setWebsites);
userAboutRouter.route('/setPhone').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setPhone);
userAboutRouter.route('/setEmail').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setEmail);
userAboutRouter.route('/setLanguage').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setLanguage);
userAboutRouter.route('/setWorkplace').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setWorkplace);
userAboutRouter.route('/setCollege').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setCollege);
userAboutRouter.route('/setHighschool').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setHighschool);
userAboutRouter.route('/setCurrentPlace').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setCurrentPlace);
userAboutRouter.route('/setHometown').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setHometown);
userAboutRouter.route('/setRelationshipStatus').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setRelationshipStatus);
userAboutRouter.route('/setGender').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setGender);
userAboutRouter.route('/setInterestedIn').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setInterestedIn);
userAboutRouter.route('/setBirthDate').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setBirthDate);
userAboutRouter.route('/setAbout').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setAbout);
userAboutRouter.route('/setNickname').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setNickname);
userAboutRouter.route('/setFavQuotes').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setFaveQuotes);
userAboutRouter.route('/setSocialLinks').post([new authJwt_middleware_1.AuthJwtMiddleware().verifyJwtToken], new user_about_controller_1.UserAboutController().setSocialLinks);
exports.default = userAboutRouter;
//# sourceMappingURL=user-about.routes.js.map