// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {world} from "../../data/world";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  world.tick();
  res.status(200).json("OK");
}
