import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../Controllers/users.js";
import {verifyToken} from "../middleware/auth.js"