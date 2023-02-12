
import mongoose, { Document, Schema } from 'mongoose';
export interface ChatData {
    participants: Array<String>;

    latestMessage: string
    timestamp: Date;
}
const ChatSchema: Schema = new Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
    {
        timestamps: true,
    });

export default mongoose.model<ChatData>('Chat', ChatSchema);
