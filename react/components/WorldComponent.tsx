import React from "react";
import WorldLocationComponent from "./WorldLocationComponent";
import {worldPage} from "../models/World";
import {observer} from "mobx-react-lite";

function WorldComponent() {
  return <div style={{display: "flex"}}>
    <div>
      <ul>
        {worldPage.locations ? worldPage.locations.map(location => <li key={location.id}
          onClick={() => worldPage.setSelectedLocationId(location.id)}>{location.name}</li>) : null}
      </ul>
    </div>
    <div>
      {worldPage.selectedLocationId ? <WorldLocationComponent/> : null}
    </div>
  </div>
}

export default observer(WorldComponent);
