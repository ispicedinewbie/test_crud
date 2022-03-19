"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (url = '') => {
    try {
        const urlObject = new URL(url);
        return urlObject !== null && urlObject.protocol.startsWith('http');
    }
    catch (err) {
        return false;
    }
};
