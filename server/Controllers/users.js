import User from "../models/User.js"; // Importing users properties basically user schema object

// READ

export const getUser = async (req, res) => {   // Reading information about user form the database
  try {
    const { id } = req.params; // Getting user id from the parameters of requested page's link 
    const user = await User.findById(id); // Getting the user by using id and sending back that info to the frontend
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {  // Reading information about  user friends from the database
  try {
    const { id } = req.params; // Getting user id from the parameters of requested page's link 
    const user = await User.findById(id); // Getting the user by using id

    const friends = await Promise.all(  // By using promise.all method we are running map method on each member of friend array in the map method we are using id of the user to find the friend for that user 
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(  // By using map method we are getting all the friends with following properties and storing them into new array
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {  // Adding and removing friends from the users database
  try {
    {
      const { id, friendId } = req.params;  // Getting user's and friend's id's
      const user = await User.findById(id); // Finding user by user's id
      const friend = await User.findById(friendId); // Finding friend by friend's id

      if (user.friends.includes(friendId)) {  //  If friend id is in the user's friend array then (This function will trigger when friend is already into the friend list but user again clicked on the add friend option so it will now remove that friend)
        user.friends.filter((f_id) => f_id != friendId); // We are filtering that id from the array and removing it
        friend.friends.filter((u_id) => u_id != id); // And also removing user from the friend list of the friend
      } else {
        user.friends.push(friendId);  // Else if user does not contain id  of that friend into its array so now we are gonna add that id into the array
        friend.friends.push(id);
      }

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath,
          };
        }
      );

      res.status(200).json(formattedFriends);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
