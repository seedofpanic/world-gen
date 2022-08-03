// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {pick} from "next/dist/lib/pick";
import {WorldLocation} from "../../../data/worldLocation";
import {world} from "../../../data/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<WorldLocation>>
) {
  const {locationId} = req.query;

  res.status(200)
    .json(pick(world.locations[locationId as string], ["name", "type"]));
}
