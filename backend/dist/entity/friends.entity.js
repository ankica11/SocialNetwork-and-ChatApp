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
exports.Friends = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var Friends = /** @class */ (function () {
    function Friends() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Friends.prototype, "friendsId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Friends.prototype, "senderFriendId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Friends.prototype, "receiverFriendId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Friends.prototype, "accepted", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date
        //when requests is accepted and friendship is made
        )
    ], Friends.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Friends.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (senderFriend) { return senderFriend.senderFriends; }, { cascade: true }),
        __metadata("design:type", user_entity_1.User)
    ], Friends.prototype, "senderFriend", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (receiverFriend) { return receiverFriend.receiverFriends; }, { cascade: true }),
        __metadata("design:type", user_entity_1.User)
    ], Friends.prototype, "receiverFriend", void 0);
    Friends = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)('friends_constraint', ["senderFriendId", "receiverFriendId"])
    ], Friends);
    return Friends;
}());
exports.Friends = Friends;
//# sourceMappingURL=friends.entity.js.map