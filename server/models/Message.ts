
import mongoose, { Document, Schema } from 'mongoose';
export interface MessageData {
    content: string;
    sender: string;
    conversation: string;
    timestamp: Date;
}
const MessageSchema: Schema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    }
});

export default mongoose.model<MessageData>('Message', MessageSchema);
