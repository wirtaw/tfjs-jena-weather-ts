"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("node:http"));
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
const index_1 = __importDefault(require("./config/index"));
const PORT = index_1.default.MAIN.PORT;
const logger = (0, pino_1.default)();
const loggerHttp = (0, pino_http_1.default)({ logger });
async function run() {
    const server = http.createServer();
    server.listen(PORT, () => {
        logger.info(`  > Running socket on port: ${PORT}`);
    });
    server.on('request', (_req, _res) => {
        loggerHttp(_req, _res);
        _res.log.info('log is available on both req and res');
        _res.writeHead(200, { 'Content-Type': 'application/json' });
        _res.end(JSON.stringify({
            data: 'Hello World!',
        }));
    });
    server.on('error', (error) => {
        if (error instanceof TypeError && 'code' in error) {
            if (error.code === 'EADDRINUSE') {
                logger.error(`Port ${PORT} is already in use.`);
            }
        }
        process.exit(1);
    });
}
run();
