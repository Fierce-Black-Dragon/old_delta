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
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '1233';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '1233r';
const generateAccessToken = (foundUser) => {
    return jsonwebtoken_1.default.sign({
        "UserInfo": {
            "username": foundUser.username,
        }
    }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
const generateRefreshToken = (foundUser) => {
    return jsonwebtoken_1.default.sign({ "username": foundUser.username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                return reject(err);
            resolve(decoded);
        }));
    });
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const foundUser = yield User_1.default.findOne({ username }).exec();
    if (foundUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new User_1.default({ username, password: hashedPassword });
    yield newUser.save();
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ accessToken, username: newUser.username });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const foundUser = yield User_1.default.findOne({ username }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const match = yield bcrypt_1.default.compare(password, foundUser.password);
    if (!match)
        return res.status(401).json({ message: 'Unauthorized' });
    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
});
exports.login = login;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    try {
        const decoded = yield verifyRefreshToken(refreshToken);
        if (!decoded)
            return res.status(401).json({ message: 'Unauthorized' });
        const foundUser = yield User_1.default.findOne({ username: decoded.username }).exec();
        if (!foundUser)
            return res.status(401).json({ message: 'Unauthorized' });
        const accessToken = jsonwebtoken_1.default.sign({
            "UserInfo": {
                "username": foundUser.username,
            }
        }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    }
    catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
});
exports.refresh = refresh;
const logout = (req, res) => {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ message: 'Cookie cleared' });
};
exports.logout = logout;
