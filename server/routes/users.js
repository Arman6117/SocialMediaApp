import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../Controllers/users.js";
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

// READ
router.get("/:id", verifyToken,getUser);  // Getting information of user

router.get("/:id/:friendId", verifyToken,getUserFriends); // Getting information of user's friends

// UPDATE
router.patch("/:id/:friendId", addRemoveFriend);

export default router;