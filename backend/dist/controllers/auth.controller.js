"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var user_entity_1 = require("../entity/user.entity");
var data_source_1 = __importDefault(require("../config/data-source"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var session_entity_1 = require("../entity/session.entity");
var sessions_dao_1 = require("../DAO/sessions.dao");
var AuthController = /** @class */ (function () {
    function AuthController() {
        var _this = this;
        this.signin = function (req, res) {
            console.log("signin controller");
            var user;
            var username = req.body.username;
            var password = req.body.password;
            //find user by username
            data_source_1.default
                .getRepository(user_entity_1.User)
                .findOne({
                where: {
                    username: username
                },
                relations: {
                    user_info: true
                }
            })
                .then(function (resultUser) {
                user = resultUser;
                var message;
                //username doesn't exist case/user not found
                if (!resultUser) {
                    //messages shoul be wague
                    message = "Username or password is wrong.";
                    return res.status(404).send({ message: message });
                }
                //if username exists check for password
                var passwordHashVerify = bcrypt_1.default.compareSync(password, resultUser.password);
                if (!passwordHashVerify) {
                    //if password is wrong return response with status code 401-bad request
                    message = "Username or password is wrong.";
                    return res.status(404).send({ message: message });
                }
                //jwt authentication and authorization
                //create token that will be sent to back to user
                //jwt = header.payload.sign
                //it's bad practice to put confidental data like passwords
                //in payload cuz payload is only base64 encoded not encrypted
                //and it's part of http header
                //creating access jwt token
                var payload = { id: resultUser.id }; //this is what is signed
                var token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.ACCESS_JWT_EXP),
                }); //token expires in one hour after that time token will be dismissed
                //creating refresh token/ session adding new session to db
                //console.log(process.env.ACCESS_JWT_EXP)
                var refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                    expiresIn: parseInt(process.env.REFRESH_TOKEN_EXP),
                });
                var expirationDate = new Date();
                expirationDate.setSeconds(expirationDate.getSeconds() +
                    parseInt(process.env.REFRESH_TOKEN_EXP) -
                    expirationDate.getTimezoneOffset() * 60);
                var userSession = new session_entity_1.UserSession();
                userSession.refreshToken = refreshToken;
                userSession.expires_at = expirationDate;
                userSession.lastAccessedAt = new Date();
                userSession.online = true;
                resultUser.user_session = userSession;
                data_source_1.default
                    .getRepository(user_entity_1.User)
                    .save(resultUser)
                    .then(function (data) {
                    //user is successfully updated connected with its session and new session is created
                    //seting token in cookie session
                    //req.session.token = token;
                    res.cookie("auth-access-token", token, {
                        maxAge: parseInt(process.env.COOKIE_ACCESS_JWT_EXP),
                        httpOnly: true,
                        domain: "localhost",
                    });
                    //everything is okay login the user
                    message = "Successfully signed in!";
                    //setting refresh token to cookie
                    res.cookie("auth-refresh-token", refreshToken, {
                        maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_EXP),
                        httpOnly: true,
                        domain: "localhost",
                        path: "/api/auth/",
                    });
                    res.status(200).send({
                        message: message,
                        user: resultUser,
                        //refreshToken: refreshToken
                        //accessToken: token
                    });
                })
                    .catch(function (err) {
                    res.status(500).send({ message: err.message });
                });
            })
                .catch(function (err) {
                //promise rejected - internal server error status code 500
                //so basically this is 3rd line of defense of validation
                //if client side validation or server side validation fail
                //then we have db validation, in terms that db contstraint like
                //not null column need to be satisfied
                res.status(500).send({ message: err.message });
            });
        };
        this.refreshToken = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                console.log("Refresh token");
                refreshToken = req.cookies["auth-refresh-token"];
                //console.log(refreshToken)
                if (!refreshToken) {
                    //only if someone steals access token and make a request with them
                    //as part of reply attack
                    //console.log(req.session)
                    //req.session = null;
                    //maybe to delete the session if it exists
                    return [2 /*return*/, res
                            .status(403)
                            .send({ message: "No refresh token provided. Unauthorized." })];
                }
                jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
                    if (err) {
                        var message_1 = "Altered token signing you out.";
                        //error will be thrown if refresh token has expired
                        //or refresh token is altered
                        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                            message_1 = "Refresh token expired. Sigining you out.";
                        }
                        //console.log(message)
                        //console.log(req)
                        res.clearCookie("auth-refresh-token", {
                            domain: "localhost",
                            path: "/api/auth/",
                        });
                        res.clearCookie("auth-access-token", {
                            domain: "localhost",
                        });
                        //req.session = null;
                        return new sessions_dao_1.UserSessionDAO()
                            .deleteSession(refreshToken)
                            .then(function (data) {
                            //console.log(data);
                            return res.status(403).send({ message: message_1 });
                        });
                    }
                    //evrything is okay refresh token is ok
                    //then create new access token
                    //@ts-ignore
                    var payload = { id: decoded.id };
                    var newAccessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: parseInt(process.env.ACCESS_JWT_EXP),
                    });
                    //saving new access token to cookie session request object
                    //server will automatically set set-cookie response header to
                    //new access token
                    //req.session.token = newAccessToken;
                    res.cookie("auth-access-token", newAccessToken, {
                        maxAge: parseInt(process.env.COOKIE_ACCESS_JWT_EXP),
                        httpOnly: true,
                        domain: "localhost",
                    });
                    return res.status(200).send({
                        refreshToken: refreshToken,
                    });
                });
                return [2 /*return*/];
            });
        }); };
        this.signup = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //sign up logic
                        console.log("Signup controller...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        user = new user_entity_1.User();
                        user.name = req.body.name;
                        user.email = req.body.email;
                        user.username = req.body.username;
                        user.password = bcrypt_1.default.hashSync(req.body.password, 8);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ message: 'success' })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500).send({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.signout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken;
            return __generator(this, function (_a) {
                console.log("Volunatary sign out");
                refreshToken = req.cookies["auth-refresh-token"];
                res.clearCookie("auth-refresh-token", {
                    domain: "localhost",
                    path: "/api/auth/",
                });
                res.clearCookie("auth-access-token", {
                    domain: "localhost",
                });
                //req.session = null;
                return [2 /*return*/, new sessions_dao_1.UserSessionDAO()
                        .deleteSession(refreshToken)
                        .then(function (data) {
                        //console.log(data);
                        return res.status(200).send({ message: "Signin out" });
                    })
                        .catch(function (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    })];
            });
        }); };
        this.getExistingUserSession = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var loggedUser, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting existing user session');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    user_session: {
                                        refreshToken: req.cookies["auth-refresh-token"]
                                    }
                                },
                                relations: {
                                    user_info: true,
                                    user_session: true
                                }
                            })];
                    case 2:
                        loggedUser = _a.sent();
                        loggedUser.user_session.lastAccessedAt = new Date();
                        loggedUser.user_session.online = true;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(loggedUser)
                            //console.log(result)
                        ];
                    case 3:
                        result = _a.sent();
                        //console.log(result)
                        return [2 /*return*/, res.status(200).send({ success: true, user: loggedUser })];
                    case 4:
                        err_2 = _a.sent();
                        console.log(err_2.message);
                        return [2 /*return*/, res.status(500).send({ success: false, message: err_2.message })];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.goOffline = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userSession, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(session_entity_1.UserSession).findOne({
                                where: {
                                    user: {
                                        id: userId
                                    }
                                }
                            })];
                    case 1:
                        userSession = _a.sent();
                        userSession.online = false;
                        userSession.lastAccessedAt = new Date();
                        return [4 /*yield*/, data_source_1.default.getRepository(session_entity_1.UserSession).save(userSession)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: result })];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3.message);
                        return [2 /*return*/, res.sendStatus(500)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map