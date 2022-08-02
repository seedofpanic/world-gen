import React from "react";
import {Character} from "../../data/character";

interface CharacterComponentProps {
  character: Character & {partner: Character, children: Character[]};
}

export function CharacterComponent({character}: CharacterComponentProps) {
  return <>
    <h1>{character?.name}</h1>
    <div>Age: {character.age}</div>
    <div>Gender: {character.gender}</div>
    <div>Partner: {character.partner.name}</div>
  </>;
}
