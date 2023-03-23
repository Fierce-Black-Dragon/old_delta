import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User";
import cookieGenerator from "../utils/cookieGenerator";

const handleLogin = async (req: Request, res: Response) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const isPasswordCorrect = await user?.verifyPassword(foundUser?.password);
    if (isPasswordCorrect) {
        cookieGenerator(user, res);
    } else {
        res.sendStatus(401);
    }
};

const handleSignup = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            res.status(400).send(" every feild  is needed");
        } //finding if user is already register
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(403).send(`${existingUser.email} is already been registered`);
        }
        //creating user in mongo db
        const user = new User({ name, email, password });
        await user.save();
        //token creation function
        cookieGenerator(user, res);
    } catch (error) {
        res.json(error);
    }
};

const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
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
    jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY as Secret,
        async (err: any, decode: any) => {
            if (err) {
                console.log('expired refresh token')
            }
            const user = await User.findOne({ id: decode.id }).exec();

            cookieGenerator(user, res);
        }
    );
}


export { handleLogin, handleSignup, handleRefreshToken };