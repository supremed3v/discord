import express from "express";

import {
  signup,
  login,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getUserDetails,
} from "../controllers/userController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/search", searchUser);

router.post("/friend-request", authMiddleware, sendFriendRequest);

router.post("/friend-request/accept", authMiddleware, acceptFriendRequest);

router.get("/me", authMiddleware, getUserDetails);

export default router;
