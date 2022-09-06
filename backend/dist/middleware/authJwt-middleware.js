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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtMiddleware = void 0;
var data_source_1 = __importDefault(require("../config/data-source"));
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var user_entity_1 = require("../entity/user.entity");
var AuthJwtMiddleware = /** @class */ (function () {
    function AuthJwtMiddleware() {
        //middleware function that is called before every access to user routes
        this.verifyJwtToken = function (req, res, next) {
            console.log("verify jwt token");
            //console.log(process.env.ACCESS_JWT_EXP)
            //scenario1. storing jwt token inside htttp header and retrieving it from http header
            //let token = req.headers['x-access-token']
            //console.log("token: ", token)
            //sceanrio2. storing jwt token inside cookie session and retrieving it from cookie session
            //let token = req.session.token;
            var token = req.cookies["auth-access-token"];
            if (!token) {
                return res.status(401).send({ message: "No access token provided" });
            }
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    //when token expires
                    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                        return res.status(401).send({ message: "Access token expired" });
                    }
                    //altered access token
                    return res.status(401).send({ message: "Unauthorized!" });
                }
                //???? why do we need this for fuck sake?????
                //@ts-ignore
                req.id = decoded.id;
                next();
            });
        };
        this.adminRoutesGuard = function (req, res, next) {
            console.log("admin routes guard");
            data_source_1.default
                .getRepository(user_entity_1.User)
                .findOneBy({
                id: req.id,
            })
                .then(function (user) {
                var hasAdminAuthorities = false;
                for (var i = 0; i < user.roles.length; i++) {
                    if ((hasAdminAuthorities = user.roles[i] == "admin")) {
                        //user has authorities to access the route
                        //just call another middleware function in queue
                        //or if there are none of these pass the request object to endpoint handler
                        next();
                        return;
                    }
                }
                //user doesn't have admin privileges to access restricted route
                return res.status(403).send({
                    message: "Restricted access! Requires admin role.",
                });
            })
                .catch(function (err) {
                return res
                    .status(500)
                    .send({ message: "Unable to validate user role." });
            });
        };
        this.moderatorRoutesGuard = function (req, res, next) {
            console.log("moderator routes guard");
            data_source_1.default
                .getRepository(user_entity_1.User)
                .findOneBy({
                id: req.id,
            })
                .then(function (user) {
                var hasModeratorAuthorities = false;
                for (var i = 0; i < user.roles.length; i++) {
                    //if user have moderator or admin role he can access
                    //moderator routes if we approach to admin privileges
                    //as superset of moderator privilleges and moderator privileges as
                    //super setcof user privilleges
                    //but there can be different model if we look at moderator
                    //to be separate role not subset of admin role
                    //in terms that moderator can access the routes that admin can't
                    //and vice versa
                    if ((hasModeratorAuthorities =
                        user.roles[i] === "moderator" || user.roles[i] === "admin")) {
                        next();
                        return;
                    }
                }
                return res.status(403).send({
                    message: "restricted access! Requires moderator role.",
                });
            })
                .catch(function (err) {
                //if promise is rejected
                return res.status(500).send({
                    message: "Unable to validate user role.",
                });
            });
        };
    }
    return AuthJwtMiddleware;
}());
exports.AuthJwtMiddleware = AuthJwtMiddleware;
//# sourceMappingURL=authJwt-middleware.js.map