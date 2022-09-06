"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var typeorm_1 = require("typeorm");
var comment_entity_1 = require("./comment.entity");
var friends_entity_1 = require("./friends.entity");
var message_entity_1 = require("./message.entity");
var post_entity_1 = require("./post.entity");
var reaction_entity_1 = require("./reaction.entity");
var session_entity_1 = require("./session.entity");
var user_info_entity_1 = require("./user-info.entity");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
    UserRole["USER"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
//active record extends BaseEntity and we don't need repository or menager
//to execute typeorm functions and we can define statis function inside 
//our entity class
//data mapper - entities are just models and doesn't contain any logic
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: true
        }),
        __metadata("design:type", Boolean)
    ], User.prototype, "isActive", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: "http://localhost:3000/api/user_about/files/user.jpg"
        }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "background_photo", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "set",
            enum: UserRole,
            default: [UserRole.USER]
        }),
        __metadata("design:type", Array)
    ], User.prototype, "roles", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return session_entity_1.UserSession; }, function (user_session) { return user_session.user; }, { cascade: true, onDelete: 'SET NULL' }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", session_entity_1.UserSession)
    ], User.prototype, "user_session", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_info_entity_1.UserInfo; }, function (user_info) { return user_info.user; }, { cascade: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_info_entity_1.UserInfo)
    ], User.prototype, "user_info", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return friends_entity_1.Friends; }, function (senderFriend) { return senderFriend.senderFriend; }),
        __metadata("design:type", Array)
    ], User.prototype, "senderFriends", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return friends_entity_1.Friends; }, function (receiverFriend) { return receiverFriend.receiverFriend; }),
        __metadata("design:type", Array)
    ], User.prototype, "receiverFriends", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return post_entity_1.Post; }, function (post) { return post.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reaction_entity_1.Reaction; }, function (reactions) { return reactions.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "reactions", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (sentMessages) { return sentMessages.sender; }),
        __metadata("design:type", Array)
    ], User.prototype, "sentMessages", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return message_entity_1.Message; }, function (receivedMessages) { return receivedMessages.receiver; }),
        __metadata("design:type", Array)
    ], User.prototype, "receivedMessages", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.entity.js.map