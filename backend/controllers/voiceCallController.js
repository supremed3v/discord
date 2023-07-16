import { getIO } from "../utils/socket.js";

export const callUser = (req, res) => {
  try {
    const { from, to } = req.body;
    getIO().emit("callUser", { from, to });
    res.status(200).json({ message: "Call Initiated" });
  } catch (error) {
    console.error("Error calling user", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const acceptCall = (req, res) => {
  try {
    const { from, to } = req.body;
    getIO().emit("anwerCall", { from, to });

    res.status(200).json({ message: "Call Accepted" });
  } catch (error) {
    console.error("Error accepting call", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const disconnectCall = (req, res) => {
  try {
    getIO().emit("disconnect");

    res.status(200).json({ message: "Call Ended" });
  } catch (error) {
    console.error("Error ending call", error);
    res.status(500).json({ message: "Server error" });
  }
};
