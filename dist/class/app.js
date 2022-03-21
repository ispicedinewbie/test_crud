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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const config_1 = require("../constants/config");
const bookmark_controller_1 = require("../controller/bookmark.controller");
const bookmark_service_1 = require("../services/bookmark.service");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setCors();
        this.setConfig();
        this.setMysqlConfig();
        this.setControllers();
        this.setError();
    }
    setConfig() {
        this.app.use(body_parser_1.default.json({ limit: "50mb" }));
        this.app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
        this.app.use((0, compression_1.default)());
    }
    setCors() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Expose-Headers", "x-total-count");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
            res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
            next();
        });
    }
    setMysqlConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.db.sync({ force: true, alter: true });
        });
    }
    setControllers() {
        const bookmarkController = new bookmark_controller_1.BookMarkController(new bookmark_service_1.BookMarkService);
        this.app.use("/bookmark", bookmarkController.router);
    }
    setError() {
        this.app.use((error, request, response, next) => {
            const status = error.status || 500;
            const message = error.message || 'Something went wrong';
            response
                .status(status)
                .send({
                status,
                message
            });
        });
    }
}
exports.default = new App().app;
