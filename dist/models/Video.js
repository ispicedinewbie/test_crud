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
exports.Video = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const BookMark_1 = require("./BookMark");
let Video = class Video extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Video.prototype, "width", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Video.prototype, "height", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Video.prototype, "duree", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => BookMark_1.BookMark),
    (0, sequelize_typescript_1.Column)({
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], Video.prototype, "bookMarkId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => BookMark_1.BookMark),
    __metadata("design:type", BookMark_1.BookMark)
], Video.prototype, "bookMark", void 0);
Video = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        full: {
            include: [BookMark_1.BookMark]
        }
    })),
    (0, sequelize_typescript_1.Table)({ timestamps: false })
], Video);
exports.Video = Video;
