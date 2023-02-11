"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.DB_USER || '';
const MONGO_PASSWORD = process.env.DB_PASS || '';
const MONGO_DB_Name = process.env.DB_NAME || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.gqyqk.mongodb.net/${MONGO_DB_Name}?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
