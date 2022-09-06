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
exports.Reaction = exports.ReactionType = void 0;
var typeorm_1 = require("typeorm");
var post_entity_1 = require("./post.entity");
var user_entity_1 = require("./user.entity");
var ReactionType;
(function (ReactionType) {
    ReactionType[ReactionType["LIKE"] = 0] = "LIKE";
    ReactionType[ReactionType["HEART"] = 1] = "HEART";
    ReactionType[ReactionType["LAUGH"] = 2] = "LAUGH";
    ReactionType[ReactionType["CRY"] = 3] = "CRY";
    ReactionType[ReactionType["ANGRY"] = 4] = "ANGRY";
    ReactionType[ReactionType["NEUTRAL"] = 5] = "NEUTRAL";
    ReactionType[ReactionType["BORING"] = 6] = "BORING";
    ReactionType[ReactionType["WOW"] = 7] = "WOW";
    ReactionType[ReactionType["MIDDLE_FINGER"] = 8] = "MIDDLE_FINGER";
    ReactionType[ReactionType["NONE"] = 9] = "NONE";
})(ReactionType = exports.ReactionType || (exports.ReactionType = {}));
var Reaction = /** @class */ (function () {
    function Reaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Reaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: ReactionType,
            default: ReactionType.NONE,
        }),
        __metadata("design:type", Number)
    ], Reaction.prototype, "reaction", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Reaction.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.reactions; }),
        __metadata("design:type", user_entity_1.User)
    ], Reaction.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return post_entity_1.Post; }, function (post) { return post.reactions; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", post_entity_1.Post)
    ], Reaction.prototype, "post", void 0);
    Reaction = __decorate([
        (0, typeorm_1.Entity)()
    ], Reaction);
    return Reaction;
}());
exports.Reaction = Reaction;
//# sourceMappingURL=reaction.entity.js.map