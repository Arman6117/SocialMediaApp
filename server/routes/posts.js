import express from "express";
import {getFeedPosts,getUserPosts,likePost} from "../Controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

// READ
router.get("/", verifyToken,getFeedPosts) // Getting all the post from the feed using getFeedPost function which is defined at the controllers folder
router.get("/:userId/posts",verifyToken,getUserPosts) // Getting only user's post using getUserPost function which is defined at the controllers folder


// UPDATE
router.patch("/:id/like", verifyToken,likePost); // Liking and un-liking post by using likePost function which is defined in the controllers folder

export default router;