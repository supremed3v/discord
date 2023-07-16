import express from "express";

import {
  signup,
  login,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/userController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/search", searchUser);

router.post("/friend-request", authMiddleware, sendFriendRequest);

router.post("/friend-request/accept", authMiddleware, acceptFriendRequest);

export default router;
