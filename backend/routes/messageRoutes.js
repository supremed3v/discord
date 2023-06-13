// messageRoutes.js

import express from "express";
import {
  createMessage,
  getMessagesByChannel,
} from "../controllers/messageController.js";

const router = express.Router();

// Route to create a new message
router.post("/messages", createMessage);

// Route to retrieve messages for a channel
router.get("/channels/:channelId/messages", getMessagesByChannel);

export default router;
