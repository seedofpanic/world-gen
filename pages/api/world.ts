// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {world} from "../../data/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  res.status(200).json(world.year);
}
