import { NextApiRequest, NextApiResponse } from "next";
import { RequestData } from "next/dist/server/web/types";
import { v2 as cloudinary } from "cloudinary";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
        secure: true,
      });

      const response = await cloudinary.uploader.upload(
        req.body.image,
        { folder: "filmget" }
      );
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
