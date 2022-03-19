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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookMarkController = void 0;
const express_1 = require("express");
class BookMarkController {
    constructor(bookMarkService) {
        this.bookMarkService = bookMarkService;
        this.router = (0, express_1.Router)();
        this.all = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const list = yield this.bookMarkService.all();
            res.send(list);
        });
        this.add = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const video = yield this.bookMarkService.add(req.body);
                res.send(video);
            }
            catch (e) {
                next(e);
            }
        });
        this.edit = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookMarkService.edit(req.body, req.params.id);
                res.send({ save: result });
            }
            catch (e) {
                next(e);
            }
        });
        this.read = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bookMark = yield this.bookMarkService.read(req.params.id);
                res.send(bookMark);
            }
            catch (e) {
                next(e);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.bookMarkService.delete(req.params.id);
                res.send({ save: result });
            }
            catch (e) {
                next(e);
            }
        });
        this.setRoutes();
    }
    setRoutes() {
        this.router.get("/", this.all);
        this.router.post("/add", this.add);
        this.router.put("/edit/:id", this.edit);
        this.router.get("/read/:id", this.read);
        this.router.delete("/delete/:id", this.delete);
    }
}
exports.BookMarkController = BookMarkController;
