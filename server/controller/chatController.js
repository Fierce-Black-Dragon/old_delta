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
exports.findUserChat = exports.findUserChats = exports.createChat = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { reciver } = req.body;
        const foundChat = yield Chat_1.default.findOne({
            participants: { $all: [user, reciver] }
        });
        if (foundChat) {
            return res.status(200).json({
                foundChat
            });
        }
        const newChat = new Chat_1.default({
            participants: [user, reciver]
        });
        const chat = yield newChat.save();
        return res.status(200).json({
            chat
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
});
exports.createChat = createChat;
// get a user chats
const findUserChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const foundChats = yield Chat_1.default.find({
            participants: { $in: [user] }
        });
        if (foundChats) {
            res.status(200).json({
                chats: foundChats
            });
        }
        else {
            res.status(200).json({
                chats: []
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});
exports.findUserChats = findUserChats;
//  find a singlechat
const findUserChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { reciver } = req.body;
        const foundChat = yield Chat_1.default.findOne({
            participants: { $all: [user, reciver] }
        });
        if (foundChat) {
            res.status(200).json({
                foundChat
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
});
exports.findUserChat = findUserChat;
