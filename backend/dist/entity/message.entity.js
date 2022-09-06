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
exports.Message = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var Message = /** @class */ (function () {
    function Message() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Message.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Message.prototype, "senderId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Message.prototype, "receiverId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (sender) { return sender.sentMessages; }),
        __metadata("design:type", user_entity_1.User)
    ], Message.prototype, "sender", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (receiver) { return receiver.receivedMessages; }),
        __metadata("design:type", user_entity_1.User)
    ], Message.prototype, "receiver", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text"
        }),
        __metadata("design:type", String)
    ], Message.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Message.prototype, "created_at", void 0);
    Message = __decorate([
        (0, typeorm_1.Entity)()
    ], Message);
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.entity.js.map