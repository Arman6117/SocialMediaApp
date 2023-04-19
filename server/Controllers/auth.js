import  bcrypt from "bcrypt"; // Encrypting the password
// import  bcrypt0 from "bcryptjs"; // Encrypting the password
import jwt from "jsonwebtoken"; // Sending user a token for authorization
import User from "../models/User.js" //Getting user object so we can use properties of the object register and log in an user
import bcryptjs from "bcryptjs";

// REGISTER USER
export const register = async(req,res) => {  // Registering a new user 
    try {
        const {
            firstName,
            lastName,
            email,
            password,               // Getting all these props from the body of the webpage when user fill the register form
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt(); // Adding salt to the password entered by the user to encrypt it
        const passwordHash = await bcrypt.hash(password,salt); // Storing hashed by password which is generated by the hashing algorithm with user's entered password and salt

        const newUser = new User ({ // Creating a new user by using our User model/schema 
            firstName,
            lastName,        
            email,
            password: passwordHash, // Storing hashed password instead of plain written pass
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random() * 10000), 
            impressions:Math.floor(Math.random() * 10000),
        });  // Creating and saving a user
        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser) // sending status code of 201 when user is registered successfully
    } catch (err) {
        res.status(500).json({error: err.message}); // Sending error message if something went wrong
    }
}

// LOGGING IN USER

// BASIC AUTHENTICATION
export const login = async(req,res) =>
{
    try
    {
        const {email,password} = req.body; // Getting user email and password form body 
        const user = await User.findOne({email: email}); // Using mongoose function findOne to find only that one matching email given by user if they are already signed in it will match 

        if(!user){  // If email given by the user is not found then going to return this error message
            res.status(400).json({msg:"Invalid Email user does not exist!!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);  // Using bcrypt function compare to compare password enter by the user while registering and the password entered by the user while logging again compare method uses same salt that were already used to register the user 

        if (!isMatch) return  res.status(400).json({msg:"Invalid password"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); // Creating a user token so we can later on verify the user by using these tokens
        delete user.password; // Deleting user password
        res.status(200).json({token,user});
    }
    catch(err)
    {
        res.status(500).json({error: err.message});
    }
}
// BASIC AUTHENTICATION
