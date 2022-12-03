import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";

interface ChangeUsernameApiRequest extends NextApiRequest {
  body: {
    data: [{ value: string; id: string }];
    currentUsername: string;
  };
}

const handler = async (req: ChangeUsernameApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Check if code runs in production or in development, use the address specified for environment
      // Connect to the database
      if (process.env.NODE_ENV === "production") {
        await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
      } else {
        await mongoose.connect(process.env.DB_ADDRESS_DEV!, { dbName: "filmget" });
      }
    } catch (error) {
      throw new Error("[ERROR] Couldnt' connect to the database!");
    }

    const userData = req.body.data[0];


    // Validate username
    if (userData.value.trim().length >= 18 || userData.value.trim().length === 0) {
        return res.send({message: "Username can have only up to 18 characters!", success: false})
    } 

    try {

      // Check for user with desired username (if such user exists)
      const existingUser = await User.findOne({
        username: userData.value,
      });

      // Check if current session user exists
      const currentUser = await User.findOne({
        username: req.body.currentUsername,
      });
      

      // If no user with current session name was found in the db, return failed request
      if (!currentUser) {
        res.status(500).send("Cannot find current user in the database");
      }

      // If user with such username exists, set success to false, return message
      if (existingUser) {
        res.send({
          message: "User with this username already exists",
          success: false,
        });
      } else {
        // Change username and save user
        currentUser.username = userData.value;
        await currentUser.save();
        res.send({ message: "Succesfully changed username!", success: true });
      }
    } catch (e) {
      res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'POST' METHOD");
  }
};

export default handler;
