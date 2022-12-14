import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import { signIn } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Check if code runs in production or in development, use the address specified for environment
      if (process.env.NODE_ENV === "production") {
        await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
      } else {
        await mongoose.connect(process.env.DB_ADDRESS_DEV!, { dbName: "filmget" });
      }
    } catch (error) {
      throw new Error("[ERROR] Couldnt' connect to the database!");
    }

    // res.redirect("/home");
    const { username, email, password } = req.body;
 
    try {
      // Check if user with such username doesn't exist already
      const existingUser = await User.findOne({username});
      if (existingUser) {
        res.send({message: "* User with this username already exists", success: false})
        return
      }

      // Get current date to store 
      const date = Date.now();

      // Hash password and store the user in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword, signUpDate: date });
      await newUser.save();

      // Close db connection
      mongoose.connection.close();
    } catch (error) {
      throw new Error("[ERROR] Failed to store the user in the database");
    }

    res.send({ message: "Successfully created an account!", success: true});
  } else {
    res.send({ message: `Use POST method instead of ${req.method}` , success: false});
  }
};

export default handler;
