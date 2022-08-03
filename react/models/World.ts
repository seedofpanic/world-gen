import {autorun, IReactionDisposer, makeAutoObservable, reaction} from "mobx";
import {apiGet, apiPost} from "../../data/api";
import {Character} from "../../data/character";
import {WorldLocation} from "../../data/worldLocation";
import {CharacterResponse} from "../../data/api/characterResponse";

const reactionsDisposers: IReactionDisposer[] = [];

export class WorldPage {
  locations?: WorldLocation[];
  selectedLocationId: string | null = null;
  location?: WorldLocation;
  characters?: Character[];
  selectedCharacterId: string | null = null;
  characterPage: CharacterResponse | null = null;
  year = 0;

  constructor() {
    makeAutoObservable(this);
  }

  refreshReactions() {
    reactionsDisposers.forEach(disposer => disposer());
    reactionsDisposers.length = 0;

    apiGet<number>("world").then((data) => {this.setYear(data)});
    apiGet<WorldLocation[]>("locations").then(data => this.setLocations(data));

    reactionsDisposers.push(reaction(() => this.selectedLocationId, selectedLocationId => {
      if (!selectedLocationId) {
        return;
      }

      apiGet<WorldLocation>("locations/" + selectedLocationId).then(data => this.setLocation(data));
      apiGet<Character[]>("locations/" + selectedLocationId + "/characters").then(data => this.setCharacters(data));
    }, {fireImmediately: true}));

    reactionsDisposers.push(autorun(() => {
      if (this.selectedLocationId && this.selectedCharacterId) {
        apiGet<CharacterResponse>("locations/" + this.selectedLocationId + "/characters/" + this.selectedCharacterId).then(data => this.setCharacter(data));
      }
    }));
  }

  init() {
    this.refreshReactions();
  }

  setYear(year: number) {
    this.year = year;
  }

  setLocations(locations: WorldLocation[]) {
    this.locations = locations;
  }

  setSelectedLocationId(id: string) {
    this.selectedLocationId = id;
    this.setSelectedCharacterId(null);
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

  setSelectedCharacterId(id: string | null) {
    this.selectedCharacterId = id;

    if (id === null) {
      this.characterPage = null;
    }
  }

  tick() {
    apiPost('iteration').then(() => this.refreshReactions());
  }
}

export const worldPage = new WorldPage();
