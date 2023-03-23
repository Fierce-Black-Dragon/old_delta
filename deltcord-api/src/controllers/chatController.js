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
const Chat_1 = __importDefault(require("../models/Chat"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderDetails = req.user;
        const data = req.body;
        const isChatAvail = yield Chat_1.default.find({
            $and: [
                { users: { $elemMatch: { $eq: senderDetails._id } } },
                { users: { $elemMatch: { $eq: data.userId } } },
            ]
        })
            .populate("users", "-password")
            .populate("latestMessage");
        if (isChatAvail && isChatAvail.length > 0) {
            res.status(200).json({
                status: 200,
                data: isChatAvail[0],
            });
        }
        else {
            const newChat = new Chat_1.default({});
            yield newChat.save();
        }
    }
    catch (error) {
    }
});
