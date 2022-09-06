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
exports.UserController = void 0;
var data_source_1 = __importDefault(require("../config/data-source"));
var user_entity_1 = require("../entity/user.entity");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.search = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var term, termArray_1, whereQuery_1, whereQuery2_1, params_1, whereParams_1, sqlQuery, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('searching for user...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        term = req.query.term;
                        termArray_1 = term.split(' ');
                        whereQuery_1 = '';
                        whereQuery2_1 = '';
                        params_1 = [];
                        whereParams_1 = {};
                        termArray_1.forEach(function (item, ind) {
                            if (ind == termArray_1.length - 1) {
                                whereQuery_1 += "user.name LIKE :term".concat(ind);
                                whereQuery2_1 += "name LIKE ?";
                            }
                            else {
                                whereQuery_1 += "user.name LIKE :term".concat(ind, " OR ");
                                whereQuery2_1 += "name LIKE ? OR ";
                            }
                            whereParams_1['term' + ind] = "%" + item + "%";
                            params_1.push("%" + item + "%");
                        });
                        params_1.push(term);
                        sqlQuery = "SELECT * FROM USER WHERE " + whereQuery2_1 + " ORDER BY instr(name, ?) DESC";
                        return [4 /*yield*/, data_source_1.default.manager.query(sqlQuery, params_1)
                            /*const searchResults: User[] = await appDataSource.getRepository(User)
                                                                     .createQueryBuilder("user")
                                                                     .where(whereQuery, whereParams)
                                                                     .getMany()*/
                        ];
                    case 2:
                        result = _a.sent();
                        /*const searchResults: User[] = await appDataSource.getRepository(User)
                                                                 .createQueryBuilder("user")
                                                                 .where(whereQuery, whereParams)
                                                                 .getMany()*/
                        return [2 /*return*/, res.status(200).send({ searchResults: result })];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(500).send({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.get_all = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("get all");
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).find()];
                    case 1:
                        users = _a.sent();
                        res.status(200).send({ data: users });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).send({ message: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUser = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.body.userId;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, res.status(200).send({ user: user })];
                    case 2:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, res.status(200).send({ message: err_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserByUsername = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var username, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('user by username');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        username = req.body.username;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    username: username
                                },
                                relations: {
                                    user_info: true,
                                    posts: {
                                        comments: {
                                            user: true
                                        },
                                        reactions: {
                                            user: true
                                        }
                                    }
                                },
                                order: {
                                    posts: {
                                        created_at: "DESC",
                                        comments: { created_at: "ASC" }
                                    }
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, res.status(200).send({ user: user })];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, res.status(200).send({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //adding new user
        this.add = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = new user_entity_1.User();
                        user.username = req.body.username;
                        user.password = bcrypt_1.default.hashSync(req.body.password, 8);
                        user.name = req.body.name;
                        user.phone = req.body.phone;
                        user.email = req.body.email;
                        user.avatar = req.body.avatar;
                        user.background_photo = req.body.background_photo;
                        user.roles = req.body.roles;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 1:
                        result = _a.sent();
                        res.send(result);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).send({ message: err_5.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.change = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var param, user, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //changing password test
                        console.log("changing password...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        param = req.query.id;
                        return [4 /*yield*/, data_source_1.default
                                .getRepository(user_entity_1.User)
                                .findOneBy({ id: parseInt(param) })];
                    case 2:
                        user = _a.sent();
                        user.password = bcrypt_1.default.hashSync(req.body.password, 8);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result = _a.sent();
                        res.status(200).send({ message: "Successfully updated!", user: result });
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        res.status(500).send({ message: err_6.message });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.userBoard = function (req, res) {
            console.log("user board");
            res.status(200).send({ message: "User content" });
        };
        this.adminBoard = function (req, res) {
            console.log("admin board");
            res.status(200).send("Admin board");
        };
        this.moderatorBoard = function (req, res) {
            console.log("moderator board");
            res.status(200).send("Moderator board");
        };
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map