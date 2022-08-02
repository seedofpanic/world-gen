import {Character} from "./character";

let nextId = 1;

export class WorldLocation {
  id = (nextId++).toString();
  type = "town";
  name: string;
  characters: {[name: string]: Character} = {};

  constructor() {
    this.name = "qwewqe";

    for (let i = 0; i < 5; i++) {
      const f = new Character({gender: "F", ageMin: 20, ageMax: 50});
      const m = new Character({gender: "M", ageMin: 20, ageMax: 50});

      f.partnerId = m.id;
      m.partnerId = f.id;

      this.characters[f.id] = f;
      this.characters[m.id] = m;
    }
  }
}

class World {
  locations: {[name: string]: WorldLocation} = {};

  constructor() {
    const location = new WorldLocation();
    this.locations[location.id] = location;
  }
}

export const world = new World();
