import { User } from "../models/User.js";
import { Channel } from "../models/Channel.js";
import { getIO } from "../utils/socket.js";
import { nanoid } from "nanoid";

export const createChannel = async (req, res) => {
  try {
    const { name, description, type, participants } = req.body;
    const created_by = req.user._id;

    const channel = new Channel({
      name,
      description,
      type,
      participants,
      created_by,
    });

    await channel.save();

    getIO().emit("newChannel", channel);
  } catch (error) {
    console.error("Error creating channel", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channelId = req.params.id;
    const channel = await Channel.findById(channelId).populate("members");

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Update channel by ID
export const updateChannel = async (req, res) => {
  try {
    const channelId = req.params.id;
    const { name, description } = req.body;

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    channel.name = name;
    channel.description = description;

    const updatedChannel = await channel.save();

    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Add user to channel

export const addUserToChannel = async (req, res) => {
  try {
    const { token } = req.params;
    const { userId } = req.user;

    const channel = await Channel.findOne({ token });

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    if (channel.participants.includes(userId)) {
      return res.status(400).json({ error: "User already in channel" });
    }

    if (!channel.invitedUsers.includes(userId)) {
      return res.status(400).json({ error: "User not invited" });
    }

    channel.participants.push(userId);
    await channel.save();

    getIO()
      .to(channel.id)
      .emit("userJoined", { channelId: channel.id, userId });
  } catch (error) {
    console.error("Error adding user to channel", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const generateChannelToken = async (req, res) => {
  try {
    const token = `channel-${nanoid(5)}`;

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating channel token", error);
    res.status(500).json({ message: "Server error" });
  }
};
