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
exports.UserAboutController = void 0;
var data_source_1 = __importDefault(require("../config/data-source"));
var user_entity_1 = require("../entity/user.entity");
var user_info_entity_1 = require("../entity/user-info.entity");
var UserAboutController = /** @class */ (function () {
    function UserAboutController() {
        var _this = this;
        this.getPhoto = function (req, res) {
            console.log('getting profile photo...');
            var fileName = req.params.name;
            var directoryPath = "./resources/static/assets/uploads/";
            res.download(directoryPath + fileName, fileName, function (err) {
                if (err) {
                    res.download(directoryPath + 'user.jpg', 'user.jpg', function (err) {
                        if (err) {
                            res.status(500).send({
                                message: "Could not download the file. " + err,
                            });
                        }
                    });
                }
            });
        };
        this.uploadPhoto = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var profilePhotoURL, username, user, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('uploading photo...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        profilePhotoURL = "http://localhost:3000/api/user_about/files/" + req.file.originalname;
                        username = req.body.username;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    username: username
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        user.avatar = profilePhotoURL;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result = _a.sent();
                        res.status(200).send({ success: result });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.setWorkplace = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, workplace, user, user_info, result_1, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        workplace = req.body.workplace;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.workplace = workplace;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_1 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.workplace = workplace;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, res.status(500).send({ message: err_2.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setCollege = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, college, user, user_info, result_2, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting college for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        college = req.body.college;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.college = college;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_2 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.college = college;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, res.status(500).send({ message: err_3.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setHighschool = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, highSchool, user, user_info, result_3, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        highSchool = req.body.highschool;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.highSchool = highSchool;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_3 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.highSchool = highSchool;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, res.status(500).send({ message: err_4.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setCurrentPlace = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, currentPlace, user, user_info, result_4, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        currentPlace = req.body.currentPlace;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.currentPlace = currentPlace;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_4 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.currentPlace = currentPlace;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, res.status(500).send({ message: err_5.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setHometown = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, hometown, user, user_info, result_5, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        hometown = req.body.hometown;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.hometown = hometown;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_5 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.hometown = hometown;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_6 = _a.sent();
                        console.log(err_6);
                        return [2 /*return*/, res.status(500).send({ message: err_6.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setRelationshipStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, relationshipStatus, user, user_info, result_6, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        relationshipStatus = req.body.relationshipStatus;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.relationshipStatus = relationshipStatus;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_6 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.relationshipStatus = relationshipStatus;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_7 = _a.sent();
                        console.log(err_7);
                        return [2 /*return*/, res.status(500).send({ message: err_7.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setGender = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, gender, user, user_info, result_7, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        gender = req.body.gender;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.gender = gender;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_7 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.gender = gender;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_8 = _a.sent();
                        console.log(err_8);
                        return [2 /*return*/, res.status(500).send({ message: err_8.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setInterestedIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, interestedIn, user, user_info, result_8, result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        interestedIn = req.body.interestedIn;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.interestedIn = interestedIn;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_8 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.interestedIn = interestedIn;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_9 = _a.sent();
                        console.log(err_9);
                        return [2 /*return*/, res.status(500).send({ message: err_9.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setBirthDate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, birthDate, user, user_info, result_9, result, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting birthday for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        birthDate = new Date(req.body.birthDate);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.birthDate = birthDate;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_9 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.birthDate = birthDate;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_10 = _a.sent();
                        console.log(err_10);
                        return [2 /*return*/, res.status(500).send({ message: err_10.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setAbout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, about, user, user_info, result_10, result, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        about = req.body.about;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.about = about;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_10 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.about = about;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_11 = _a.sent();
                        console.log(err_11);
                        return [2 /*return*/, res.status(500).send({ message: err_11.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setFaveQuotes = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, favQuotes, user, user_info, result_11, result, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        favQuotes = req.body.favQuotes;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.favQuotes = favQuotes;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_11 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.favQuotes = favQuotes;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_12 = _a.sent();
                        console.log(err_12);
                        return [2 /*return*/, res.status(500).send({ message: err_12.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setSocialLinks = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, socialLinks, user, user_info, result_12, result, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting social links for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        socialLinks = req.body.socialLinks;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.socialLinks = socialLinks;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_12 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.socialLinks = socialLinks;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_13 = _a.sent();
                        console.log(err_13);
                        return [2 /*return*/, res.status(500).send({ message: err_13.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setNickname = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, nickname, user, user_info, result_13, result, err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        nickname = req.body.nickname;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.nickname = nickname;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_13 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.nickname = nickname;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_14 = _a.sent();
                        console.log(err_14);
                        return [2 /*return*/, res.status(500).send({ message: err_14.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setPhone = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, phone, user, user_info, result_14, result, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        phone = req.body.phone;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.phone = phone;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_14 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.phone = phone;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_15 = _a.sent();
                        console.log(err_15);
                        return [2 /*return*/, res.status(500).send({ message: err_15.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setEmail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, email, user, user_info, result_15, result, err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        email = req.body.email;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.email = email;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_15 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.email = email;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_16 = _a.sent();
                        console.log(err_16);
                        return [2 /*return*/, res.status(500).send({ message: err_16.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setLanguage = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, language, user, user_info, result_16, result, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        language = req.body.language;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.language = language;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_16 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.language = language;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_17 = _a.sent();
                        console.log(err_17);
                        return [2 /*return*/, res.status(500).send({ message: err_17.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.setWebsites = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, websites, user, user_info, result_17, result, err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setting workplace for user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        userId = req.body.userId;
                        websites = req.body.websites;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: {
                                    id: userId
                                },
                                relations: {
                                    user_info: true
                                }
                            })];
                    case 2:
                        user = _a.sent();
                        if (!(user.user_info == null)) return [3 /*break*/, 4];
                        user_info = new user_info_entity_1.UserInfo();
                        user_info.website = websites;
                        user.user_info = user_info;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 3:
                        result_17 = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 4:
                        //user_info row for user already exists in database
                        user.user_info.website = websites;
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).save(user)];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: user })];
                    case 6:
                        err_18 = _a.sent();
                        console.log(err_18);
                        return [2 /*return*/, res.status(500).send({ message: err_18.message })];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserAboutController;
}());
exports.UserAboutController = UserAboutController;
//# sourceMappingURL=user-about.controller.js.map