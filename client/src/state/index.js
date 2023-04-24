// SETTING UP THE STATES OF WHOLE APPLICATION

import { ExpandOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit"; //A function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.

const initialState = { // All the initial states of the app
    mode:"light", // Theme mode initially will be set to light mode 
    user: null, // Initially there will be no users so set to null
    token: null,
    posts: [], // Initially posts array will be equal to empty there will be nothing
     
};

export const authSlice = createSlice ({
    name:"auth", // Name of the slice
    initialState, // Passing initial state object so we can change them
    reducers:{ // The reducers are the function that gets called when state of the app gets changed
        setMode:(state) => {
            state.mode = state.mode ==="light" ? "dark":"light" // Changing the mode state if mode is light then change it to dark and if it is not then change to the light. This function will trigger when user tries to change the theme of the app
        },
        setLogin:(state,action) =>{ // Changing the login page initial state
         state.user = action.payload.user; // Saving the information when user logs in
         state.token = action.payload.token;
        },
        setLogout:(state) =>{
            state.user = null;  // Deleting the information when user log's out
            state.token = null;
        },
        setFriends:(state,action) =>{
            if(state.user)
            {
               state.user.friends = action.payload.friends; // If user exits then we are storing the friends 
            }
            else
            {
                console.error("User friends does not exits");
            }
        },
        setPosts:(state,action) =>{
            state.posts = action.payload.posts; // Saving the posts
        },
        setPost: (state,action) =>{
            const updatedPosts = state.posts.map((post)=>{
                if(post.id === action.payload.post_id) return action.payload.post;
                return post; // We are gonna return user an updated post if there wil any change in posts. For looking updated posts we are mapping through whole posts array and checking if the post id is equal to the stored post and if so we are returning that post and if not we are returning the current post 
            });
            state.posts = updatedPosts; // Storing updated post into the array of posts
        }
    }
})

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;