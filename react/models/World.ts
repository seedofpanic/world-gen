import {autorun, makeAutoObservable, reaction} from "mobx";
import {apiGet} from "../../data/api";
import {Character} from "../../data/character";
import {WorldLocation} from "../../data/worldLocation";
import {CharacterResponse} from "../../data/api/characterResponse";

export class WorldPage {
  locations?: WorldLocation[];
  selectedLocationId: string | null = null;
  location?: WorldLocation;
  characters?: Character[];
  selectedCharacterId: string | null = null;
  characterPage: CharacterResponse | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(() => this.selectedLocationId, selectedLocationId => {
      apiGet("locations/" + selectedLocationId).then(data => this.setLocation(data));
      apiGet("locations/" + selectedLocationId + "/characters").then(data => this.setCharacters(data));
    });

    autorun(() => {
      if (this.selectedLocationId && this.selectedCharacterId) {
        apiGet("locations/" + this.selectedLocationId + "/characters/" + this.selectedCharacterId).then(data => this.setCharacter(data));
      }
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
    this.selectedCharacterId = null
  }

  private setLocation(data: WorldLocation) {
    this.location = data;
  }

  private setCharacters(data: Character[]) {
    this.characters = data;
  }

  setCharacter(characterPage: CharacterResponse) {
    this.characterPage = characterPage;
  }

  setSelectedCharacterId(id: string) {
    this.selectedCharacterId = id;
  }
}

export const worldPage = new WorldPage();
