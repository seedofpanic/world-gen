import {Character} from "./character";
import {WorldLocation} from "./worldLocation";
import {worldInit} from "./world";

interface World {
  nextId: number;
  locations: {[name: string]: WorldLocation};
  characters: {[name: string]: Character};
  graveyard: WorldLocation | null;
  year: number;
}

declare const global: {
  world: World;
};

if (!global.world) {
  global.world = {
    nextId: 0,
    locations: {},
    characters: {},
    graveyard: null,
    year: 0,
  };
  setTimeout(() => {
    worldInit();
  });
}

export const world: World = global.world;
