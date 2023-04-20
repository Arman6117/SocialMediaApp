import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path, { format } from "path";
import { fileURLToPath } from "url";
import { error, log } from "console";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import {register} from "./Controllers/auth.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./Controllers/posts.js"; 
import User from "./models/User.js";
import Post from "./models/Post.js";
import  {users, posts} from "./Data/index.js"


// CONFIGURATION z
const __filename = fileURLToPath(import.meta.url);  // To get the file url
const __dirname = path.dirname(__filename) // To get the file name
dotenv.config();  // To use dotenv files
const app = express(); // Envoking express to use middleware 
app.use(express.json);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:"true"}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:"true"}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname, 'public/assets'))); // To get the assets so path set

// FILE STORAGE 
const storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, "public/assets");
    },
    filename: function(req,file,cb)
    {
        cb(null, file.originalname);
    }
});
// Savings file uploaded by the user at the specified path
const upload = multer({storage}); // using this variable to upload a file

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"),register) // Registering user and taking one picture

app.post("/posts", verifyToken,upload.single("picture"), createPost); // When user hits the post button for posting a picture then this function will trigger we are using createPost function which is defined in the controllers folder


// ROUTES
app.use("/auth", authRoutes); // Authorization route use to authorize users to register or login
app.use("/users", userRoutes);// Users route use to add all the features that user can use while using the app like adding and removing friends
app.use("/posts", postRoutes) // When user wants to post something on the web we will use this route


// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port ${PORT}`) );

    // User.insertMany(users);
    // Post.insertMany(posts);
})
.catch((error) => console.log(`${error} did not connect`));



