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
exports.UserInfo = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserInfo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "workplace", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "college", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "highSchool", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "currentPlace", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "hometown", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "relationshipStatus", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "gender", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "interestedIn", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", Date)
    ], UserInfo.prototype, "birthDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "language", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "about", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "nickname", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], UserInfo.prototype, "favQuotes", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-json", {
            nullable: true
        }),
        __metadata("design:type", Object)
    ], UserInfo.prototype, "socialLinks", void 0);
    __decorate([
        (0, typeorm_1.Column)("simple-array", {
            nullable: true
        }),
        __metadata("design:type", Array)
    ], UserInfo.prototype, "website", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_entity_1.User; }, function (user) { return user.user_info; }),
        __metadata("design:type", user_entity_1.User)
    ], UserInfo.prototype, "user", void 0);
    UserInfo = __decorate([
        (0, typeorm_1.Entity)()
    ], UserInfo);
    return UserInfo;
}());
exports.UserInfo = UserInfo;
//# sourceMappingURL=user-info.entity.js.map