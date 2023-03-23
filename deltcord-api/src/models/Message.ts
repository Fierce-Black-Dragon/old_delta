import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    ChatRef:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },

    content: {
        type: String,

    },
    message_type: {
        type: String,
        default: 'string'
        // video ,img audio
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // more fields will be added when required
});

const Message = mongoose.model("Message", messageSchema);
export default Message