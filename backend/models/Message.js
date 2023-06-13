import mongoose from "mongoose";

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeStamps: {
    type: Date,
    default: Date.now,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  seenBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Message = mongoose.model("Message", schema);
