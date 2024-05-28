import express from "express";

import {
  signup,
  login,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getUserDetails,
  getUserRequests,
  getUserSentRequests,
  getUserFriends,
} from "../controllers/userController.js";
import { authMiddleware } from "../utils/authMiddleware.js";
import verifyUserToken from "../utils/verifyUserToken.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/search", verifyUserToken, searchUser);

router.post("/friend-request", verifyUserToken, sendFriendRequest);

router.post("/friend-request/accept", verifyUserToken, acceptFriendRequest);

router.get("/me", verifyUserToken, getUserDetails);

router.get("/my-friend-requests", verifyUserToken, getUserSentRequests);
router.get("/incoming-friend-requests", verifyUserToken, getUserRequests);

router.get("/my-friends", verifyUserToken, getUserFriends);

export default router;
