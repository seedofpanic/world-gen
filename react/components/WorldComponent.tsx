import React, {useEffect} from "react";
import WorldLocationComponent from "./WorldLocationComponent";
import {worldPage} from "../models/World";
import {observer} from "mobx-react-lite";
import {CharacterComponent} from "./CharacterComponent";
import {format} from "date-fns";

function WorldComponent() {
  useEffect(() => {
    worldPage.init();
  }, []);
  return <>
    <div>
      {worldPage.year} <button onClick={() => worldPage.tick()}>Evaluate</button>
    </div>
    <div style={{display: "flex"}}>
      <div>
        <ul>
          {worldPage.locations ? worldPage.locations.map(location => <li key={location.id}
                                                                         onClick={() => worldPage.setSelectedLocationId(location.id)}>{location.name}</li>) : null}
        </ul>
      </div>
      <div>
        {worldPage.selectedLocationId ? <WorldLocationComponent/> : null}
      </div>
      <div>
        {worldPage.characterPage ?
          <CharacterComponent data={worldPage.characterPage}/>
          : null}
      </div>
    </div>
  </>
}

export default observer(WorldComponent);
