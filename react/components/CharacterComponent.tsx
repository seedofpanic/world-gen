import React from "react";
import {observer} from "mobx-react-lite";
import {CharacterResponse} from "../../data/api/characterResponse";

interface CharacterComponentProps {
  data: CharacterResponse;
}

export function CharacterComponent({data}: CharacterComponentProps) {
  const {character, partner, children, parents} = data;

  return <>
    <h1>{character.name} {character.sname} {character.isDead ? "[dead]" : ""}</h1>
    <div>Age: {character.age}</div>
    <div>Gender: {character.gender}</div>
    <div>Partner: {partner ? partner.name : "no"}</div>
    <div>Parents: </div>
    <ul>
      {parents.map(parent => <li key={parent.id}>{parent.name}</li>)}
    </ul>
    <div>Children: </div>
    <ul>
      {children.map(child => <li key={child.id}>{child.name}</li>)}
    </ul>
  </>;
}

export default observer(CharacterComponent);
