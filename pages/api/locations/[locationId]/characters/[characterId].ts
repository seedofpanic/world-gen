// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {world} from "../../../../../data/world";
import {pick} from "next/dist/lib/pick";
import {Character} from "../../../../../data/character";

function pickCharacterData(character: Character) {
  return pick(character, ["name", "sname", "age"]);
}

type Data = {partner: Partial<Character> | null, children: Partial<Character>[]} | Partial<Character>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {characterId} = req.query;
  const character = world.characters[characterId as string];

  res.status(200)
    .json({
      ...pickCharacterData(character),
      partner: character.partnerId ? pickCharacterData(world.characters[character.partnerId]) : null,
      children: character.children.map(pickCharacterData)
    });
}
