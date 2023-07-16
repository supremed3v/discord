import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  callActive: {
    type: Boolean,
    default: false,
  },
  callParticipants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  callStartedAt: {
    type: Date,
  },
  callEndedAt: {
    type: Date,
  },
  type: {
    type: String,
    default: "public",
    enums: ["public", "private"],
  },
  invitedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  inviteCode: {
    type: String,
    default: () => nanoid(10),
  },
});

export const Channel = mongoose.model("Channel", channelSchema);
