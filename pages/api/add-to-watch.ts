import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import { movieInterface, seriesInterface } from "../../utils/types";

interface ToWatchApiRequest extends NextApiRequest {
  body: {
    username: string;
    media: movieInterface | seriesInterface;
  };
}

const handler = async (req: ToWatchApiRequest, res: NextApiResponse) => {
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
      const currentUser = await User.findOne({ username: req.body.username });
      const { mediaToWatch, mediaIds } = currentUser;

      if (mediaIds.includes(req.body.media.id)) {
        return res.status(500).send("[ERROR] Item already in watch-list!");
      }

      currentUser.mediaToWatch = [...mediaToWatch, req.body.media];
      currentUser.mediaIds = [...mediaIds, req.body.media.id];

      await currentUser.save();

      return res.status(200).send("Successfully added item to watch-list!");
    } catch (e) {
      console.dir(e);
      return res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'POST' METHOD");
  }
};

export default handler;
