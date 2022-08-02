import React from "react";
import {worldPage} from "../models/World";
import {observer} from "mobx-react-lite";

function CharactersListComponent() {
  return <ul>
    {worldPage.characters?.map(character => <li key={character.id}>{character.gender} {character.name}</li>)}
  </ul>
}

export default observer(CharactersListComponent);
