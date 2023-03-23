import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/User";
const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: any = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as Secret,
        async (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); //invalid token
            const foundUser = await User.findOne({ id: decoded.id }).exec();
            if (!foundUser) return res.sendStatus(404)
            req.user = foundUser;

            next();
        }
    );
}
export default verifyJWT