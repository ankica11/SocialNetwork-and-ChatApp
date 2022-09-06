"use strict";
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
exports.validateUsername = exports.signup_validation = exports.signin_validation = void 0;
var joi_1 = __importDefault(require("joi"));
var data_source_1 = __importDefault(require("../config/data-source"));
var user_entity_1 = require("../entity/user.entity");
var signin_validation = function (req, res, next) {
    console.log("signin validation middleware");
    var schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().required().min(3),
    });
    //it will return object like {error: {}, value:{}}
    var error = schema.validate({
        username: req.body.username,
        password: req.body.password,
    }).error;
    //if validation error happend notify the user and send back response
    //without forwarding request to controller
    //we will not call the next cuz we won't to break the chain
    if (error) {
        //401 status for bad request
        //maybe we should set session to null
        // req.session = null;
        return res
            .status(400)
            .send({
            message: {
                msg_text: "Validation error: " + error.details[0].message,
                type: error.details[0].path,
            },
        });
    }
    //only if validation is passed handle the request to the next
    //function in middleware array or if there's no such
    //handle the requesst to endpoint controller
    next();
};
exports.signin_validation = signin_validation;
var signup_validation = function (req, res, next) {
    console.log("Signup validation middleware...");
    var schema = joi_1.default.object({
        username: joi_1.default.string()
            .required()
            .alphanum(),
        password: joi_1.default.string()
            .required()
            .pattern(new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})')),
        confirmPassword: joi_1.default.ref('password'),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2 })
            .required(),
        name: joi_1.default.string()
            .required()
    })
        .with('password', 'confirmPassword');
    var error = schema.validate(req.body).error;
    if (error) {
        //console.log(error)
        return res.status(400).send({
            message: {
                msg_text: "Validation error: " + error.details[0].message,
                type: error.details[0].path,
            },
        });
    }
    next();
};
exports.signup_validation = signup_validation;
var validateUsername = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Username validation endpoint");
                username = req.body.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOneBy({
                        username: username
                    })];
            case 2:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(200).send({ exists: true })];
                }
                //okay you may continue
                return [2 /*return*/, res.status(200).send({ exists: false })];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).send({ message: err_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validateUsername = validateUsername;
//# sourceMappingURL=validation.js.map