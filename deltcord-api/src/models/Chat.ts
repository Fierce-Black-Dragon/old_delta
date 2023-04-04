import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

const chatSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }],
     
},{
    timestamps: true
  });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat