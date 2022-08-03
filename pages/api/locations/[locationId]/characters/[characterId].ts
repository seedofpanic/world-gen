// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextApiRequest, NextApiResponse} from 'next';
import {pick} from "next/dist/lib/pick";
import {Character} from "../../../../../data/character";
import {CharacterResponse} from "../../../../../data/api/characterResponse";
import {world} from "../../../../../data/db";

const characterFields: (keyof Character)[] = ["name", "sname", "age", "gender", "isDead"];
const focusedCharacterFields: (keyof Character)[] = [...characterFields, "log"];

function pickCharacterData(character: Character) {
  return pick(character, characterFields);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CharacterResponse>
) {
  const {characterId} = req.query;
  const character = world.characters[characterId as string];

  res.status(200)
    .json({
      character: pick(character, focusedCharacterFields),
      partner: character.partnerId ? pickCharacterData(world.characters[character.partnerId]) : null,
      children: character.children.map(childId => pickCharacterData(world.characters[childId])),
        parents: character.parents.map(parentId => pickCharacterData(world.characters[parentId])),
    });
}
