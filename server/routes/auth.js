import express from "express"
import {login} from "../Controllers/auth.js";

const router = express.Router(); // Creating a router to handle the requests

router.post("/login",login); // Posting login info on the route login with the  login which is defined in the controller folder 

export default router;