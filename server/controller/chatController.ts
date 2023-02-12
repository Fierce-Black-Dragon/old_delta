import { ParamsDictionary } from 'express-serve-static-core';
import { Request, Response, RequestHandler, query } from 'express';
import Chat from '../models/Chat';
//  create chat

export interface RequestUser extends Request {
    user: string
}

export const createChat = async (req: Request<ParamsDictionary, any, any, any, Record<string, any>>, res: Response) => {
    try {
        const { user } = req as RequestUser;
        const { reciver } = req.body
        const foundChat = await Chat.findOne({
            participants: { $all: [user, reciver] }
        })
        if (foundChat) {
            return res.status(200).json({
                foundChat
            })
        }
        const newChat = new Chat({
            participants: [user, reciver]
        })
        const chat = await newChat.save()
        return res.status(200).json({
            chat
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        })
    }
}
// get a user chats
export const findUserChats = async (req: Request<ParamsDictionary, any, any, any, Record<string, any>>, res: Response) => {
    try {
        const { user } = req as RequestUser;
        const foundChats = await Chat.find({
            participants: { $in: [user] }
        })
        if (foundChats) {
            res.status(200).json({
                chats: foundChats
            })
        }
        else {
            res.status(200).json({
                chats: []
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}
//  find a singlechat
export const findUserChat = async (req: Request<ParamsDictionary, any, any, any, Record<string, any>>, res: Response) => {
    try {
        const { user } = req as RequestUser;
        const { reciver } = req.body
        const foundChat = await Chat.findOne({
            participants: { $all: [user, reciver] }
        })
        if (foundChat) {
            res.status(200).json({
                foundChat
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}