import {WorldLocation} from "./worldLocation";
import {Character} from "./character";

class World {
  locations: {[name: string]: WorldLocation} = {};
  characters: {[name: string]: Character} = {};

  constructor() {
  }

  init() {
    const location = new WorldLocation();
    this.locations[location.id] = location;
  }

  tick() {
    Object.values(this.locations).forEach(location => location.tick())
  }
}

export const world = new World();

world.init();
