import React from "react";
import {observer} from "mobx-react-lite";
import {CharacterResponse} from "../../data/api/characterResponse";

interface CharacterComponentProps {
  data: CharacterResponse;
}

export function CharacterComponent({data}: CharacterComponentProps) {
  const {character, partner, children} = data;

  return <>
    <h1>{character.name}</h1>
    <div>Age: {character.age}</div>
    <div>Gender: {character.gender}</div>
    <div>Partner: {partner ? partner.name : "no"}</div>
    <ul>
      {children.map(child => <li key={child.id}>{child.name}</li>)}
    </ul>
  </>;
}

export default observer(CharacterComponent);
