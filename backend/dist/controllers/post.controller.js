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
exports.PostController = void 0;
var data_source_1 = __importDefault(require("../config/data-source"));
var user_entity_1 = require("../entity/user.entity");
var post_entity_1 = require("../entity/post.entity");
var comment_entity_1 = require("../entity/comment.entity");
var reaction_entity_1 = require("../entity/reaction.entity");
var PostController = /** @class */ (function () {
    function PostController() {
        var _this = this;
        this.getReaction = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, userId, reaction, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting reaction...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        postId = parseInt(req.body.postId);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(reaction_entity_1.Reaction).findOne({
                                where: {
                                    user: {
                                        id: userId
                                    },
                                    post: {
                                        id: postId
                                    }
                                }
                            })];
                    case 2:
                        reaction = _a.sent();
                        res.status(200).send({ reaction: reaction });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        res.sendStatus(500);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addReaction = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, userId, user, post, existing_reaction, result, reaction, addedReaction, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('adding reaction...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        postId = parseInt(req.body.postId);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOneBy({ id: userId })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.Post).findOneBy({ id: postId })];
                    case 3:
                        post = _a.sent();
                        if (!(user != null && post != null)) return [3 /*break*/, 8];
                        return [4 /*yield*/, data_source_1.default.getRepository(reaction_entity_1.Reaction).findOne({
                                where: {
                                    post: {
                                        id: postId
                                    },
                                    user: {
                                        id: userId
                                    }
                                }
                            })];
                    case 4:
                        existing_reaction = _a.sent();
                        if (!existing_reaction) return [3 /*break*/, 6];
                        return [4 /*yield*/, data_source_1.default.getRepository(reaction_entity_1.Reaction).remove(existing_reaction)];
                    case 5:
                        result = _a.sent();
                        _a.label = 6;
                    case 6:
                        reaction = new reaction_entity_1.Reaction();
                        reaction.reaction = req.body.reaction;
                        reaction.user = user;
                        reaction.post = post;
                        return [4 /*yield*/, data_source_1.default.getRepository(reaction_entity_1.Reaction).save(reaction)];
                    case 7:
                        addedReaction = _a.sent();
                        console.log(req.body.reaction);
                        return [2 /*return*/, res.status(200).send({ result: addedReaction })];
                    case 8: return [2 /*return*/, res.sendStatus(404)];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        err_2 = _a.sent();
                        console.log(err_2);
                        res.sendStatus(500);
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.addComment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, userId, user, post, comment, addedComment, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('adding comment...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        postId = parseInt(req.body.postId);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User).findOneBy({ id: userId })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.Post).findOneBy({ id: postId })];
                    case 3:
                        post = _a.sent();
                        if (!(user != null && post != null)) return [3 /*break*/, 5];
                        comment = new comment_entity_1.Comment();
                        comment.text = req.body.commentText;
                        comment.user = user;
                        comment.post = post;
                        return [4 /*yield*/, data_source_1.default.getRepository(comment_entity_1.Comment).save(comment)];
                    case 4:
                        addedComment = _a.sent();
                        return [2 /*return*/, res.status(200).send({ result: addedComment })];
                    case 5: return [2 /*return*/, res.sendStatus(404)];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_3 = _a.sent();
                        console.log(err_3);
                        res.sendStatus(500);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.downloadPostImage = function (req, res) {
            //console.log('downloading post image...')
            var fileName = req.params.name;
            var directoryPath = "./resources/static/assets/uploads/";
            res.download(directoryPath + fileName, fileName, function (err) {
                if (err) {
                    res.status(404).send({ success: false });
                }
            });
        };
        this.addPost = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, user, post, postImageURL, addedPost, post_result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("adding post");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(user_entity_1.User)
                                .findOneBy({ id: userId })];
                    case 2:
                        user = _a.sent();
                        post = new post_entity_1.Post();
                        post.text = req.body.postText;
                        post.audience = req.body.audience;
                        // post.link = req.body.link
                        if (req.file) {
                            postImageURL = "http://localhost:3000/api/posts/files/" + req.file.originalname;
                            post.photo = postImageURL;
                        }
                        post.user = user;
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.Post)
                                .save(post)];
                    case 3:
                        addedPost = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.Post).findOne({
                                where: {
                                    id: addedPost.id
                                },
                                relations: {
                                    comments: {
                                        user: true
                                    },
                                    reactions: {
                                        user: true
                                    }
                                }
                            })];
                    case 4:
                        post_result = _a.sent();
                        res.status(200).send({ message: 'added post',
                            addedPost: post_result });
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        console.log(err_4);
                        res.sendStatus(500);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId, posts, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting all users posts...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        userId = parseInt(req.body.userId);
                        return [4 /*yield*/, data_source_1.default.getRepository(post_entity_1.Post)
                                .find({
                                relations: {
                                    user: true,
                                    comments: {
                                        user: true
                                    },
                                    reactions: {
                                        user: true
                                    }
                                },
                                where: {
                                    user: {
                                        id: userId
                                    }
                                },
                                order: {
                                    created_at: "DESC",
                                    comments: { created_at: "ASC" }
                                }
                            })];
                    case 2:
                        posts = _a.sent();
                        return [2 /*return*/, res.status(200).send({ myPosts: posts })];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        res.status(500).send(err_5.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getTimelinePosts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var loggedUserId, sqlQuery, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading timeline...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        loggedUserId = parseInt(req.body.loggedUserId);
                        sqlQuery = "select distinct post.*, user.name, user.username, user.avatar from post\n" +
                            "inner join friends on (userId = senderFriendId or userId=receiverFriendId) inner join user on (userId = user.id)\n" +
                            "where (senderFriendId = ? or receiverFriendId = ?) and accepted = true and audience != 'private'\n" +
                            "order by post.created_at DESC";
                        return [4 /*yield*/, data_source_1.default.manager.query(sqlQuery, [loggedUserId, loggedUserId])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.status(200).send({ timeline: result })];
                    case 3:
                        err_6 = _a.sent();
                        console.log(err_6);
                        res.status(500).send(err_6.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getCommentsAndReactions = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var postId, reactions, comments, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        postId = parseInt(req.body.postId);
                        return [4 /*yield*/, data_source_1.default.getRepository(reaction_entity_1.Reaction).find({
                                where: {
                                    post: {
                                        id: postId
                                    }
                                },
                                relations: {
                                    user: true
                                }
                            })];
                    case 1:
                        reactions = _a.sent();
                        return [4 /*yield*/, data_source_1.default.getRepository(comment_entity_1.Comment).find({
                                where: {
                                    post: {
                                        id: postId
                                    }
                                },
                                relations: {
                                    user: true
                                }
                            })];
                    case 2:
                        comments = _a.sent();
                        return [2 /*return*/, res.status(200).send({ reactions: reactions, comments: comments })];
                    case 3:
                        err_7 = _a.sent();
                        console.log(err_7);
                        res.status(500).send(err_7.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return PostController;
}());
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map