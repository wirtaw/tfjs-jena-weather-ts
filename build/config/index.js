"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MAIN: {
        PORT: ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.PORT) && !Number.isNaN(parseInt((_b = process.env) === null || _b === void 0 ? void 0 : _b.PORT, 10)) ? parseInt(process.env.PORT, 10) : 8080,
    }
};
