import User, { UserData } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response } from "express";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '1233'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '1233r'

const generateAccessToken = (foundUser: UserData) => {
    return jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
            }
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );
};

const generateRefreshToken = (foundUser: UserData) => {
    return jwt.sign(
        { "username": foundUser.username },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

const verifyRefreshToken = async (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return reject(err);
                resolve(decoded);
            });
    });
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser = await User.findOne({ username }).exec();

    if (foundUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken, username: newUser.username });
}
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const foundUser: UserData | null = await User.findOne({ username }).exec();

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
};

export const refresh = async (req: Request, res: Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

    const refreshToken = cookies.jwt;

    try {
        const decoded: any = await verifyRefreshToken(refreshToken);
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
        const foundUser = await User.findOne({ username: decoded.username }).exec();

        if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                }
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
};



export const logout = (req: Request, res: Response) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.json({ message: 'Cookie cleared' })
}