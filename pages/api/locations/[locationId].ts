// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {world, WorldLocation} from "../../../data/world";
import {pick} from "next/dist/lib/pick";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<WorldLocation>>
) {
  const {locationId} = req.query;

  res.status(200)
    .json(pick(world.locations[locationId as string], ["name", "type"]));
}
