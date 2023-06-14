import express from "express";

import {
  signup,
  login,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/search", searchUser);

router.post("/friend-request", sendFriendRequest);

router.post("/friend-request/accept", acceptFriendRequest);

export default router;
