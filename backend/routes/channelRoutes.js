import express from "express";

import {
  createChannel,
  getChannelById,
  updateChannel,
  addUserToChannel,
  generateChannelToken,
} from "../controllers/channelController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, createChannel);

router
  .route("/:id")
  .get(authMiddleware, getChannelById)
  .put(authMiddleware, updateChannel);

router.route("/:id/user").put(authMiddleware, addUserToChannel);

router.route("/:id/token").get(authMiddleware, generateChannelToken);

export default router;
