import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import auth from "./routes/auth"
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(cors({ origin: 'http://localhost:5173/', credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: '3dofjiarfngwnfvun',
        resave: false,

        saveUninitialized: false,
        cookie: { secure: false },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth)
app.get('/', (req: Request, res: Response) => {
    res.send('server is live');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});