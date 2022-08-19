import { NextApiRequest, NextApiResponse } from "next";
import { RequestData } from "next/dist/server/web/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Add <Data> to NextApiRespons
  try {
    const moviesRes = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`,
      {mode: 'no-cors'}
    );
    const moviesData = await moviesRes.json();
    res.status(200).send(moviesData);
  } catch {
    res.status(500);
  }
};

export default handler;
