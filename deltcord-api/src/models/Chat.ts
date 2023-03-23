import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

const chatSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],

    last_msg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // more fields will be added when required
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat