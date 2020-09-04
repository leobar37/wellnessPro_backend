"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const server_1 = __importDefault(require("./classes/server"));
const typeorm_1 = require("typeorm");
const server = server_1.default.instance;
server.start(async () => {
    await typeorm_1.createConnection();
    console.log("listen on port: " + server.port);
});
