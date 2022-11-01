import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import { movieInterface, seriesInterface } from "../../utils/types";

interface AddRatingApiRequest extends NextApiRequest {
  body: {
    id: number;
    rating: number;
    username: string;
  };
}

const handler = async (req: AddRatingApiRequest, res: NextApiResponse) => {
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
      const { mediaRatings } = currentUser;
      const { id: idToAdd, rating: ratingToAdd} = req.body;


      let filteredDbArr = mediaRatings;
      mediaRatings.forEach((ratedMedia: {id: number, rating: number}, i: number) => {
        if (ratedMedia.id === ratingToAdd) {
          filteredDbArr.splice(i, 1);
        }
      });

      currentUser.mediaRatings = [
        ...filteredDbArr,
        { id: idToAdd, rating: ratingToAdd },
      ];
       
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
