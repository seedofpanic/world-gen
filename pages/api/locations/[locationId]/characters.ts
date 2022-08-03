// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {pick} from "next/dist/lib/pick";
import {Character} from "../../../../data/character";
import {world} from "../../../../data/db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Partial<Character>[]>
) {
  const {
    locationId
  } = req.query;

  res.status(200)
    .json(Object.values(world.locations[locationId as string].characters)
      .map(character => pick(character, ["id", "name", "sname", "gender"])));
}
