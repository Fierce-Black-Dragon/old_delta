"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
/** Connect to Mongo */
mongoose_1.default
    .connect(db_1.config.mongo.url)
    .then(() => {
    console.log("connect");
    StartServer();
})
    .catch((error) => console.error(error));
const StartServer = () => {
    /** Log the request */
    app.use((req, res, next) => {
        /** Log the req */
        console.log(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            console.log(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Healthcheck */
    app.get('/', (req, res, next) => res.status(200).send('Api is live'));
    app.get('/ping', (req, res, next) => res.status(200).json({ message: 'live' }));
    /** Error handling */
    app.use((req, res, next) => {
        const error = new Error('Not found');
        console.error(error);
        res.status(404).json({
            message: error.message
        });
    });
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
};
