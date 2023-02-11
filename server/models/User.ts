
import mongoose, { Document, Schema } from 'mongoose';
export interface UserData {
    username: string;

    password: string
}
const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
},
    {
        timestamps: true,
    });

export default mongoose.model<UserData>('User', UserSchema);
