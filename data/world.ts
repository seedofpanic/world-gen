import {WorldLocation} from "./worldLocation";
import {Character} from "./character";

declare const global: {
  world: World;
};

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

if (!global.world) {
  global.world = new World();

  setTimeout(() => {
    global.world.init();
  });
}

export const world = global.world;
