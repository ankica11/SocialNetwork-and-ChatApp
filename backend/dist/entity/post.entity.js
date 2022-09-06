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
exports.Post = exports.UserRole = void 0;
var typeorm_1 = require("typeorm");
var comment_entity_1 = require("./comment.entity");
var reaction_entity_1 = require("./reaction.entity");
var user_entity_1 = require("./user.entity");
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
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Post.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text"
        }),
        __metadata("design:type", String)
    ], Post.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Post.prototype, "photo", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Post.prototype, "link", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Post.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: 'public'
        }),
        __metadata("design:type", String)
    ], Post.prototype, "audience", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.posts; }),
        __metadata("design:type", user_entity_1.User)
    ], Post.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "comments", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reaction_entity_1.Reaction; }, function (reactions) { return reactions.post; }),
        __metadata("design:type", Array)
    ], Post.prototype, "reactions", void 0);
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map