import React from "react";
import CharactersListComponent from "./CharactersListComponent";
import {worldPage} from "../models/World";
import {observer} from "mobx-react-lite";

function WorldLocationComponent() {
  return <div>
    <h1>{worldPage.location?.name}</h1>
    <CharactersListComponent/>
  </div>
}

export default observer(WorldLocationComponent);
