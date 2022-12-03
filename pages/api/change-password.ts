import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import bcrypt from "bcrypt";

interface ChangeUsernameApiRequest extends NextApiRequest {
  body: {
    data: { value: string; id: string }[];
    currentUsername: string;
  };
}

const handler = async (req: ChangeUsernameApiRequest, res: NextApiResponse) => {
  const checkValidity = (password: string) => {
    if (password.length < 8) {
      return {
        message: "Password must have at least 8 characters!",
        success: false,
      };
    } else {
      let hasLargeLetter = false;
      let hasDigit = false;
      for (let i = 0; i < password.length; i++) {
        let letter = password[i];
        // Check if there is an uppercase letter in the password
        if (
          letter.toUpperCase() === letter &&
          letter !== letter.toLowerCase() &&
          // Make sure that the current character isn't a digit (doesn't have uppercase and lowercase variant)
          letter.toLowerCase() !== letter.toUpperCase()
        ) {
          hasLargeLetter = true;
        }
        // Check if char is a digit
        if (/^\d$/.test(letter)) {
          hasDigit = true;
        }
      }
      if (!hasLargeLetter || !hasDigit) {
        return {
          message: "Password must contain at least one big letter and a digit!",
          success: false,
        };
      }
    }
    return {message: null, success: true}
  };

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

    try {
      const currentPassword = req.body.data[0];
      const newPassword = req.body.data[1];

      const validityResult = checkValidity(newPassword.value);
      if (!validityResult.success) {
        const { message, success} = validityResult
        return res.send({message, success})
      };
      // Check if current session user exists
      const currentUser = await User.findOne({
        username: req.body.currentUsername,
      });

      // If no user with current session name was found in the db, return failed request
      if (!currentUser) {
        res.status(500).send("Cannot find current user in the database");
      }

      console.log(currentUser)
      const isPasswordMatching = await bcrypt.compare(
        currentPassword.value,
        currentUser.password
      );


      if (!isPasswordMatching) {
        return res.send({
          message: "Current password doesn't match!",
          success: false,
        });
      }

      // Change password and save user
      const hashedPassword = await bcrypt.hash(newPassword.value, 10);
      currentUser.password = hashedPassword;
      await currentUser.save();
      res.send({ message: "Succesfully changed password!", success: true });
    } catch (e) {
      res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'POST' METHOD");
  }
};

export default handler;
