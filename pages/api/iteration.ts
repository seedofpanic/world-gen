// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {worldTick} from "../../data/world";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  worldTick();
  res.status(200).json("OK");
}
