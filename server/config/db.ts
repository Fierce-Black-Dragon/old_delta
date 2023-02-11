
import dotenv from 'dotenv';

dotenv.config();
const MONGO_USERNAME = process.env.DB_USER || '';
const MONGO_PASSWORD = process.env.DB_PASS || '';
const MONGO_DB_Name = process.env.DB_NAME || ''
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.gqyqk.mongodb.net/${MONGO_DB_Name}?retryWrites=true&w=majority`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
