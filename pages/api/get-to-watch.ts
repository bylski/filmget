import mongoose from "mongoose";
import { User } from "../../utils/mongo/userModel";
import { NextApiRequest, NextApiResponse } from "next";




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
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
      const currentUser = await User.findOne({ username: req.query.username });
      const { mediaIds } = currentUser; 
      if (mediaIds.includes(req.query.id)) {
        res.status(200).send({wantToWatch: true});
      } else {
        res.status(200).send({wantToWatch: false});
      }

    } catch (e) {
      console.dir(e);
      res.status(500).send(`[ERROR] ${e}`);
    }
  } else {
    res.send("[ERROR] WRONG METHOD, USE 'GET' METHOD");
  }
};

export default handler;
