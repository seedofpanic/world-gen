// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {world} from "../../data/world";
import {pick} from "next/dist/lib/pick";
import {WorldLocation} from "../../data/worldLocation";

type Data = Partial<WorldLocation>[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(Object.values(world.locations).map(location => pick(location, ["id", "name"])));
}
