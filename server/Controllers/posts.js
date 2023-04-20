import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; // Getting all the information about the post from the front friend (userId == Id of the user who is posting, description == Description of the post written by the user, picturePath == Path of the picture from where it gonna get uploaded)

    const user = await User.findById(userId); // Finding user by the userID from the database

    const newPost = new Post({
      // Adding all the information and creating the newPost

      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);  // Grabbing all the post and sending them to frontend to update the feed

  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


// READ
export const getFeedPosts = async (req,res) =>
{
    try{

        const post = await Post.find() // Finding all the post and sending back to frontend
        res.status(200).json(post); 
    }catch(err)
    {
        res.status(400).json({message: err.message});
    }
}

export const getUserPosts = async(req,res) =>
{
    try{
        const {userId} = req.params; // Getting id of the user from parameters of  the link 
        const post = await Post.find({userId});  // Finding all the post having this user id
        res.status(200).json(post);
    }catch(err)
    {
        res.status(400).json({message: err.message});
    }
}

// UPDATE
export const likePost = async (req,res) =>
{
    try
    {
       const {id} = req.params;  // Getting id of the post given by database
       const {userId} = req.body; // Getting id of the user from body 
       const post = await Post.findById(id); // Finding a post with that particular id
       const isLiked = post.likes.get(userId);  // Checking the userId is in the object of the likes

       if(isLiked) // If user id is in the likes object then we are going to delete thar id from the object
       {
         post.likes.delete(userId);
       }
       else // And if user id does not exits in the likes object then we are going to add it
       {
        post.likes.set(userId);
       }

       const updatedPost = await Post.findByIdAndUpdate(  
        id,
        {likes: post.likes},
        {new: true}
       ); // Updating the post by finding it id we are updating the likes object and setting new to true then it will give document after update

       res.status(200).json(updatedPost);
    }
    catch(err)
    {
        res.status(404).json({message: err.message})
    }
}