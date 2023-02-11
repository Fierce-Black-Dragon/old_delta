import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config } from './config/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
/** Connect to Mongo */
mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log("connect")
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

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

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
    app.get('/', (req, res, next) => res.status(200).send('Api is live'))
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
    })
};