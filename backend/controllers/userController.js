import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { getIO } from "../utils/socket.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "User registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    // check if password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const searchUser = async (req, res) => {
  const { q } = req.query;
  try {
    const user = await User.find(
      { username: { $regex: q, $options: "i" } },
      {
        email: { $regex: q, $options: "i" },
      }
    ).select("username avatar");
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error searching user", error);
    res.status(500).json({ message: "Search failed" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    // Find the sender and recipient

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient)
      return res.status(400).json({ message: "User not found" });

    // Check if the recipient has already received a friend request from the sender

    if (recipient.friendRequestsSent.includes(senderId))
      return res.status(400).json({ message: "Friend request already sent" });

    // Add the recipient to the sender's friendRequestsSent array

    sender.friendRequestsSent.push(recipientId);

    // Add the sender to the recipient's friendRequestsReceived array

    recipient.friendRequests.push(senderId);

    // Save the sender and recipient

    await sender.save();
    await recipient.save();

    // Emit a friend request event to the recipient using socket.io server

    getIO().to(recipient).emit("friend request Sent", {
      senderId: sender._id,
    });

    // Emit a friend request received event to the sender using socket.io server

    getIO().to(sender).emit("friend request Received", {
      recipientId: recipient._id,
    });

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.error("Error sending friend request", error);
    res.status(500).json({ message: "Friend request failed" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Find the user and friend

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend)
      return res.status(400).json({ message: "User not found" });

    // Check if the user has received a friend request from the friend

    if (!user.friendRequests.includes(friendId))
      return res.status(400).json({ message: "No friend request received" });

    // remove the friend from the user's friendRequests array

    user.friendRequests = user.friendRequests.filter(
      (requestId) => requestId !== friendId
    );

    // remove the user from the friend's friendRequestsSent array

    friend.friendRequestsSent = friend.friendRequestsSent.filter(
      (requestId) => requestId !== userId
    );

    // Add the friend to the user's friends array

    user.friends.push(friendId);

    // Add the user to the friend's friends array

    friend.friends.push(userId);

    // Save the user and friend

    await user.save();
    await friend.save();

    // Emit a friend request accepted event to the friend using socket.io server

    getIO().to(friend).emit("friend request Accepted", {
      userId: user._id,
    });

    // Emit a friend request accepted event to the user using socket.io server

    getIO().to(user).emit("friend request Accepted", {
      friendId: friend._id,
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request", error);
    res.status(500).json({ message: "Friend request failed" });
  }
};
