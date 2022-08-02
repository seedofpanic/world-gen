import {makeAutoObservable, reaction} from "mobx";
import {WorldLocation} from "../../data/world";
import {apiGet} from "../../data/api";
import {Character} from "../../data/character";

export class WorldPage {
  locations?: WorldLocation[];
  selectedLocationId?: string;
  location?: WorldLocation;
  characters?: Character[];

  constructor() {
    makeAutoObservable(this);

    reaction(() => this.selectedLocationId, selectedLocationId => {
      apiGet("locations/" + selectedLocationId).then(data => this.setLocation(data));
      apiGet("locations/" + selectedLocationId + "/characters").then(data => this.setCharacters(data));
    });
  }

  init() {
    apiGet("locations").then(data => this.setLocations(data));
  }

  setLocations(locations: WorldLocation[]) {
    this.locations = locations;
  }

  setSelectedLocationId(id: string) {
    this.selectedLocationId = id;
  }

  private setLocation(data: WorldLocation) {
    this.location = data;
  }

  private setCharacters(data: Character[]) {
    this.characters = data;
  }
}

export const worldPage = new WorldPage();
