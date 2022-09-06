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
exports.UserSession = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var UserSession = /** @class */ (function () {
    function UserSession() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserSession.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], UserSession.prototype, "refreshToken", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], UserSession.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], UserSession.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], UserSession.prototype, "expires_at", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserSession.prototype, "user_agent", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserSession.prototype, "location", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: "valid"
        }),
        __metadata("design:type", String)
    ], UserSession.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], UserSession.prototype, "online", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "timestamp",
            nullable: true
        }),
        __metadata("design:type", Date)
    ], UserSession.prototype, "lastAccessedAt", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user.user_session; }),
        __metadata("design:type", user_entity_1.User)
    ], UserSession.prototype, "user", void 0);
    UserSession = __decorate([
        (0, typeorm_1.Entity)()
    ], UserSession);
    return UserSession;
}());
exports.UserSession = UserSession;
//# sourceMappingURL=session.entity.js.map