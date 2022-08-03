import {Character} from "../character";

export interface CharacterResponse {
  character: Partial<Character>;
  partner: Partial<Character> | null;
  children: Partial<Character>[];
  parents: Partial<Character>[];
}
