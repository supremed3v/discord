import { Message } from "../models/Message.js";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
// messageController.js
import { getIO } from "../utils/socket.js";

// Function to create a new message
export const createMessage = async (req, res) => {
  try {
    const { content, recipient } = req.body;

    const sender = new ObjectId();
    const channel = new ObjectId();

    if (recipient) {
      const message = new PrivateMessage({
        content,
        sender,
        recipient,
      });

      const savedMessage = await message.save();

      getIO().to(recipient).emit("newMessage", savedMessage);
    } else {
      // Create a new message instance
      const message = new Message({
        content,
        sender,
        channel,
      });

      // Save the message to the database
      const savedMessage = await message.save();

      // Emit a 'newMessage' event to the channel participants
      getIO().to(channel).emit("newMessage", savedMessage);

      res.status(201).json(savedMessage);
    }
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
};

//  Function to retrieve messages for a channel
export const getMessagesByChannel = async (req, res) => {
  try {
    const { channelId } = req.params;

    // Retrieve messages for the specified channel
    const messages = await Message.find({ channel: channelId })
      .sort({ timestamp: 1 })
      .populate("sender");

    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
