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
exports.FriendsController = void 0;
var data_source_1 = __importDefault(require("../config/data-source"));
var user_entity_1 = require("../entity/user.entity");
var friends_entity_1 = require("../entity/friends.entity");
var FriendsController = /** @class */ (function () {
    function FriendsController() {
        var _this = this;
        this.checkFriendsStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var loggedUserId, userId, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("checking if friends...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        loggedUserId = parseInt(req.body.loggedUserId);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).findOne({
                                where: [
                                    { senderFriendId: loggedUserId, receiverFriendId: userId },
                                    { senderFriendId: userId, receiverFriendId: loggedUserId }
                                ]
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ res: result })];
                    case 3:
                        err_1 = _a.sent();
                        res.status(500).send({ message: err_1.message });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addFriend = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var senderId, receiverId, friendSender, friendReceiver, newFriends, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Adding friends...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        senderId = parseInt(req.body.senderId);
                        receiverId = parseInt(req.body.receiverId);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: { id: senderId }
                            })];
                    case 2:
                        friendSender = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOne({
                                where: { id: receiverId }
                            })];
                    case 3:
                        friendReceiver = _a.sent();
                        newFriends = new friends_entity_1.Friends();
                        newFriends.senderFriend = friendSender;
                        newFriends.receiverFriend = friendReceiver;
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).save(newFriends)];
                    case 4:
                        result = _a.sent();
                        res.status(200).send({ message: "Request sent" });
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        console.log(err_2);
                        res.sendStatus(500);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getSentRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, sentRequests, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Getting sent requests...");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).find({
                                where: [
                                    {
                                        senderFriendId: id,
                                        accepted: false
                                    }
                                ],
                                relations: {
                                    receiverFriend: {
                                        user_info: true
                                    }
                                },
                                order: {
                                    updated_at: "ASC"
                                }
                            })];
                    case 2:
                        sentRequests = _a.sent();
                        res.status(200).send({ sentRequests: sentRequests });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getFriendRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, friendReqs, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting friend requests...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).find({
                                where: [
                                    {
                                        receiverFriendId: id,
                                        accepted: false
                                    }
                                ],
                                relations: {
                                    senderFriend: {
                                        user_info: true
                                    }
                                },
                                order: {
                                    updated_at: "ASC"
                                }
                            })];
                    case 2:
                        friendReqs = _a.sent();
                        res.status(200).send({ friendReqs: friendReqs });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getFriends = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, friendships, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting friends...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).find({
                                where: [
                                    {
                                        receiverFriendId: id,
                                        accepted: true
                                    },
                                    {
                                        senderFriendId: id,
                                        accepted: true
                                    }
                                ],
                                relations: {
                                    senderFriend: {
                                        user_info: true,
                                        user_session: true
                                    },
                                    receiverFriend: {
                                        user_info: true,
                                        user_session: true
                                    }
                                },
                                order: {
                                    updated_at: "ASC"
                                }
                            })];
                    case 2:
                        friendships = _a.sent();
                        res.status(200).send({ friendships: friendships });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.acceptRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var loggedUserId, userId, friendship, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("accepting friend request...");
                        loggedUserId = parseInt(req.body.loggedUserId);
                        userId = parseInt(req.body.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends)
                                .findOne({
                                where: {
                                    senderFriendId: userId,
                                    receiverFriendId: loggedUserId
                                }
                            })];
                    case 2:
                        friendship = _a.sent();
                        friendship.accepted = true;
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).save(friendship)];
                    case 3:
                        result = _a.sent();
                        res.status(200).send({ result: result });
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        console.log(err_6);
                        res.sendStatus(500);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.denyRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var loggedUserId, userId, friendship, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Denying friendship...");
                        loggedUserId = parseInt(req.body.loggedUserId);
                        userId = parseInt(req.body.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends)
                                .findOne({
                                where: {
                                    senderFriendId: userId,
                                    receiverFriendId: loggedUserId
                                }
                            })];
                    case 2:
                        friendship = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).remove(friendship)];
                    case 3:
                        result = _a.sent();
                        res.status(200).send({ result: result });
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        console.log(err_7);
                        res.sendStatus(500);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.deleteRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var requestId, friendship, result, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Deleting friend request...");
                        requestId = parseInt(req.body.requestId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends)
                                .findOne({
                                where: {
                                    friendsId: requestId
                                }
                            })];
                    case 2:
                        friendship = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).remove(friendship)];
                    case 3:
                        result = _a.sent();
                        res.status(200).send({ result: result });
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        console.log(err_8);
                        res.sendStatus(500);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.removeFriend = function (req, res) {
        };
        this.getSuggestions = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, mostRecentFriendship, friends, mostRecentFriendId, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting suggestions...');
                        userId = parseInt(req.body.userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).find({
                                where: [
                                    { senderFriendId: userId },
                                    { receiverFriendId: userId }
                                ],
                                order: {
                                    updated_at: "DESC"
                                },
                                skip: 0,
                                take: 1
                            })];
                    case 2:
                        mostRecentFriendship = _a.sent();
                        friends = [];
                        if (!(mostRecentFriendship.length != 0)) return [3 /*break*/, 4];
                        mostRecentFriendId = mostRecentFriendship[0].senderFriendId == userId ? mostRecentFriendship[0].receiverFriendId : mostRecentFriendship[0].senderFriendId;
                        return [4 /*yield*/, data_source_1.default.getRepository(friends_entity_1.Friends).find({
                                where: [
                                    { senderFriendId: mostRecentFriendId },
                                    { receiverFriendId: mostRecentFriendId }
                                ],
                                relations: {
                                    senderFriend: {
                                        user_info: true
                                    },
                                    receiverFriend: {
                                        user_info: true
                                    }
                                },
                                order: {
                                    updated_at: "DESC"
                                },
                                skip: 0,
                                take: 10
                            })];
                    case 3:
                        friends = _a.sent();
                        _a.label = 4;
                    case 4:
                        res.status(200).send({ result: friends });
                        return [3 /*break*/, 6];
                    case 5:
                        err_9 = _a.sent();
                        res.sendStatus(500);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getFriendsOfFriends = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, sqlQuery, suggestions, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting friends of friends...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        id = parseInt(req.body.userId);
                        sqlQuery = "select distinct u2.*\n" +
                            "from friends f1\n" +
                            "inner join user u1 on (f1.senderFriendId = u1.id or f1.receiverFriendId = u1.id) and u1.id != ?\n" +
                            "inner join friends f2 on(f2.senderFriendId = u1.id or f2.receiverFriendId = u1.id) and f2.senderFriendId <> ? and\n" +
                            "f2.receiverFriendId <> ?\n" +
                            "inner join user u2 on (f2.senderFriendId = u2.id or f2.receiverFriendId = u2.id) and f2.senderFriendId <> ? and\n" +
                            "f2.receiverFriendId <> ? and u2.id != u1.id and u2.id not in (select u3.id\n" +
                            "from friends f3\n" +
                            "inner join user u3 on (f3.senderFriendId = u3.id or f3.receiverFriendId = u3.id) and u3.id != ?\n" +
                            "where ? in (f3.senderFriendId, f3.receiverFriendId))\n" +
                            "where ? in (f1.senderFriendId, f1.receiverFriendId) and f1.accepted = true and f2.accepted = true\n" +
                            "order by f2.updated_at DESC";
                        return [4 /*yield*/, data_source_1.default.manager.query(sqlQuery, [id, id, id, id, id, id, id, id])];
                    case 2:
                        suggestions = _a.sent();
                        return [2 /*return*/, res.status(200).send({ suggestions: suggestions })];
                    case 3:
                        err_10 = _a.sent();
                        console.log(err_10);
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return FriendsController;
}());
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map