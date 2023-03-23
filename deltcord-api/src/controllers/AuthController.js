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
exports.handleRefreshToken = exports.handleSignup = exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const cookieGenerator_1 = __importDefault(require("../utils/cookieGenerator"));
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    const foundUser = yield User_1.default.findOne({ username: user }).exec();
    if (!foundUser)
        return res.sendStatus(401); //Unauthorized
    // evaluate password
    const isPasswordCorrect = yield (user === null || user === void 0 ? void 0 : user.verifyPassword(foundUser === null || foundUser === void 0 ? void 0 : foundUser.password));
    if (isPasswordCorrect) {
        (0, cookieGenerator_1.default)(user, res);
    }
    else {
        res.sendStatus(401);
    }
});
exports.handleLogin = handleLogin;
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res.status(400).send(" every feild  is needed");
        } //finding if user is already register
        const existingUser = yield User_1.default.findOne({ email: email });
        if (existingUser) {
            res.status(403).send(`${existingUser.email} is already been registered`);
        }
        //creating user in mongo db
        const user = new User_1.default({ name, email, password });
        yield user.save();
        //token creation function
        (0, cookieGenerator_1.default)(user, res);
    }
    catch (error) {
        res.json(error);
    }
});
exports.handleSignup = handleSignup;
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    // const foundUser = await User.findOne({ refreshToken }).exec();
    // // Detected refresh token reuse!
    // if (!foundUser) {
    //     jwt.verify(
    //         refreshToken,
    //         process.env.REFRESH_TOKEN_SECRET,
    //         async (err, decoded) => {
    //             if (err) return res.sendStatus(403); //Forbidden
    //             console.log('attempted refresh token reuse!')
    //             const hackedUser = await User.findOne({ username: decoded.username }).exec();
    //             hackedUser.refreshToken = [];
    //             const result = await hackedUser.save();
    //             console.log(result);
    //         }
    //     )
    //     return res.sendStatus(403); //Forbidden
    // }
    // evaluate jwt:obj 
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_KEY, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log('expired refresh token');
        }
        const user = yield User_1.default.findOne({ id: decode.id }).exec();
        (0, cookieGenerator_1.default)(user, res);
    }));
});
exports.handleRefreshToken = handleRefreshToken;
