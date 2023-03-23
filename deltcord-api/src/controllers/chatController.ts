import Chat from "../models/Chat";
import Message from "../models/Message";


const createChat = async (req: any, res: any) => {
    try {
        const senderDetails = req.user
        const data: any = req.body
        const isChatAvail = await Chat.find({
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

            const newChat = new Chat({});
            await newChat.save();
        }
    } catch (error) {

    }


}