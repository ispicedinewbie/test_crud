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
exports.BookMark = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Photo_1 = require("./Photo");
const Video_1 = require("./Video");
let BookMark = class BookMark extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BookMark.prototype, "url", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BookMark.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], BookMark.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], BookMark.prototype, "datePublish", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], BookMark.prototype, "thumbnail", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Video_1.Video),
    __metadata("design:type", Video_1.Video)
], BookMark.prototype, "video", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Photo_1.Photo),
    __metadata("design:type", Photo_1.Photo
    // @Column({
    //   type:DataType.VIRTUAL,
    //   get(){
    //     return this.getDataValue('photo') || this.getDataValue('video') //this.photo! || this.video!
    //   }
    // })
    // specificite!:Video | Photo
    )
], BookMark.prototype, "photo", void 0);
BookMark = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true
    })
], BookMark);
exports.BookMark = BookMark;
