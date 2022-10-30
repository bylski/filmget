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
        await mongoose.connect("mongodb://localhost:27017/filmget");
      }
    } catch (error) {
      throw new Error("[ERROR] Couldnt' connect to the database!");
    }

    try {
      const currentUser = await User.findOne({ username: req.body.username });
      const { mediaToWatch, mediaIds } = currentUser;

        const idToDelete = req.body.media.id;
        if (mediaIds.includes(idToDelete)) {
            const newIdsArray = mediaIds.filter((id: number, i: number) => {
                return (id === idToDelete ? false : true);
            })
            const newMediaToWatchArray = mediaToWatch.filter((media: movieInterface | seriesInterface, i: number) => {
                return (media.id === idToDelete ? false : true);
            }) 
            currentUser.mediaIds = newIdsArray;
            currentUser.mediaToWatch = newMediaToWatchArray;
      
            await currentUser.save();
      
            res.status(200).send("Successfully added item to watch-list!");
        } else {
            res.status(500).send("[ERROR] No such item was found in Watch-List")
        }



    } catch (e) {
      console.dir(e);
      res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'POST' METHOD");
  }
};

export default handler;
