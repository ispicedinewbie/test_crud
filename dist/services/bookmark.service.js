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
exports.BookMarkService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../constants/config");
const BookMark_1 = require("../models/BookMark");
const Photo_1 = require("../models/Photo");
const Video_1 = require("../models/Video");
const validUrl_1 = __importDefault(require("../utils/validUrl"));
class BookMarkService {
    constructor() {
        this.join = {
            include: [{
                    model: Video_1.Video,
                    as: 'video',
                    attributes: { exclude: ['bookMarkId'] },
                },
                {
                    model: Photo_1.Photo,
                    as: 'photo',
                    attributes: { exclude: ['bookMarkId'] }
                }]
        };
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookMark_1.BookMark.findAll(this.join);
            }
            catch (_a) {
                throw new Error('Erreur lors de la récuperation des données');
            }
        });
    }
    add(datas) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = datas.url;
            if (!(0, validUrl_1.default)(url)) {
                throw new Error('url invalide');
            }
            const parse = new URL(url);
            let typeUrl = '';
            let type = '';
            if (parse.host === 'vimeo.com') {
                type = 'video';
                typeUrl = config_1.urlApi.vimeo + url;
            }
            else if (parse.host === 'www.flickr.com') {
                type = 'photo';
                typeUrl = config_1.urlApi.flirk + url;
            }
            const data = yield this.getEmbed(typeUrl);
            let book;
            if (type === 'video') {
                book = this.addVideo(url, data);
            }
            else if (type === 'photo') {
                book = this.addPhoto(url, data);
            }
            if (book) {
                try {
                    return yield book.save();
                }
                catch (e) {
                    throw new Error('Erreur lors de la sauvegarde des données');
                }
            }
            return false;
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BookMark_1.BookMark.findByPk(id, this.join);
            }
            catch (_a) {
                throw new Error('Erreur lors de la récuperation des données');
            }
        });
    }
    edit(datas, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this.read(id);
            let retour = false;
            if (instance) {
                const filter = { where: { BookMarkId: instance.id } };
                if (instance.video !== null && datas.video) {
                    try {
                        yield Video_1.Video.update(datas.video, filter);
                    }
                    catch (e) {
                        console.log(e);
                        throw new Error('Erreur lors de la sauvegarde des données');
                    }
                }
                else if (instance.video !== null && datas.photo) {
                    try {
                        yield Photo_1.Photo.update(datas.photo, filter);
                    }
                    catch (_a) {
                        throw new Error('Erreur lors de la sauvegarde des données');
                    }
                }
                try {
                    retour = !!(yield BookMark_1.BookMark.update(datas, { where: { id: id } }));
                }
                catch (_b) {
                    throw new Error('Erreur lors de la sauvegarde des données');
                }
            }
            return retour;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const affected = yield BookMark_1.BookMark.destroy({ where: { id: id } });
            return !!affected;
        });
    }
    addPhoto(url, data) {
        return new BookMark_1.BookMark({
            title: data.title,
            url: url,
            author: data.author_name,
            datePublish: new Date(),
            thumbnail: data.thumbnail_url,
            photo: {
                width: data.width,
                height: data.height
            }
        }, {
            include: [{
                    model: Photo_1.Photo,
                    as: 'photo',
                    attributes: { exclude: ['id'] }
                }]
        });
    }
    addVideo(url, data) {
        const bookMark = new BookMark_1.BookMark({
            title: data.title,
            url: url,
            author: data.author_name,
            datePublish: new Date(data.upload_date),
            thumbnail: data.thumbnail_url,
            video: {
                width: data.width,
                height: data.height,
                duree: data.duration,
            }
        }, {
            include: [{
                    model: Video_1.Video,
                    as: 'video',
                    attributes: { exclude: ['id'] }
                }]
        });
        return bookMark;
    }
    getEmbed(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                    },
                });
                return data;
            }
            catch (_a) {
                throw new Error('Impossible de récuperer les données');
            }
        });
    }
}
exports.BookMarkService = BookMarkService;
