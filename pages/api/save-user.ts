import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
        // Check if code runs in production or in development, use the address specified for environment
      if (process.env.NODE_ENV === "production") {
        await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
      } else {
        await mongoose.connect("mongodb://localhost:27017/filmget");
      }
    } catch (error) {
      throw new Error("[ERROR] Couldnt' connect to the database!");
    }

    // res.redirect("/home");
    const { username, email, password } = req.body;
    try {
        // Hash password and store the user in the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      // Close db connection
      mongoose.connection.close();
    } catch (error) {
      throw new Error("[ERROR] Failed to store the user in the database");
    }

    res.send({message: "Successfully created an account!"})
  } else {
    res.send({message: `Use POST method instead of ${req.method}`})
  }
};

export default handler;
