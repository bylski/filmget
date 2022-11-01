import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import { movieInterface, seriesInterface } from "../../utils/types";

interface AddRatingApiRequest extends NextApiRequest {
  body: {
    id: number;
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
      const { id: idToDelete } = req.body;

      // Check if mediaRatingId doesn't exist in reduxState already
    //   let filteredStateArr = mediaRatings;
    //   mediaRatings.forEach(
    //     (ratedMedia: { id: number; rating: number }, i: number) => {
    //       if (ratedMedia.id === ratingToAdd) {
    //         filteredStateArr.splice(i, 1);
    //       }
    //     }
    //   );

      const filteredDbArray = mediaRatings;
      let toDeleteIndex = 0;
      mediaRatings.forEach((ratedMedia: {id: number, rating: number}, i: number) => {
        if (ratedMedia.id === idToDelete) {
          toDeleteIndex = i;
        }
      });
      filteredDbArray.splice(toDeleteIndex, 1);

      currentUser.mediaRatings = filteredDbArray;
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
