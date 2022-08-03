import {WorldLocation} from "./worldLocation";
import {Character} from "./character";

declare const global: {
  world: World;
};

class World {
  locations: {[name: string]: WorldLocation} = {};
  characters: {[name: string]: Character} = {};
  graveyard: WorldLocation | null = null;

  constructor() {
  }

  init() {
    const agnir = new WorldLocation("Agnir");
    this.locations[agnir.id] = agnir;
    agnir.generateCharacters();

    const graveyard = new WorldLocation("Graveyard");
    this.locations[graveyard.id] = graveyard;

    this.graveyard = graveyard;
  }

  tick() {
    Object.values(this.locations).forEach(location => {
      const result = location.tick();

      result.deadCharacters.forEach((character) => {
        this.graveyard?.characters.push(character);
      });
    })
  }
}

if (!global.world) {
  global.world = new World();

  setTimeout(() => {
    global.world.init();
  });
}

export const world = global.world;
