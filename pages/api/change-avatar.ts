import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Check if code runs in production or in development, use the address specified for environment
      // Connect to the database
      if (process.env.NODE_ENV === "production") {
        await mongoose.connect(process.env.DB_ADDRESS!, { dbName: "filmget" });
      } else {
        await mongoose.connect("mongodb://localhost:27017/filmget");
      }
    } catch (error) {
      throw new Error("[ERROR] Couldnt' connect to the database!");
    }

    try {
      const currentUser = await User.findOne({ username: req.body.username });

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });

      // // Remove old avatar photo
      if (currentUser.avatarSrc) {
        const removeResponse = await cloudinary.uploader.destroy(
          currentUser.avatarSrc.fileName
        );
        console.log(removeResponse);
      }

      const response = await cloudinary.uploader.upload(req.body.image, {
        folder: "filmget",
      });
      // Save avatar's url in the db
      currentUser.avatarSrc = {
        url: response.url,
        fileName: response.public_id,
      };
      await currentUser.save();

      res.status(200).send("Successfully uploaded new avatar!");
    } catch (e) {
      console.dir(e);
      res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'POST' METHOD");
  }
};

export default handler;
