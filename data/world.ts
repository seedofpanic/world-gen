import {worldLocationCreate, worldLocationGenerateCharacters, worldLocationTick} from "./worldLocation";
import {world} from "./db";

export function worldInit() {
  const agnir = worldLocationCreate("Agnir");
  world.locations[agnir.id] = agnir;
  worldLocationGenerateCharacters(agnir);

  const graveyard = worldLocationCreate("Graveyard");
  world.locations[graveyard.id] = graveyard;

  world.graveyard = graveyard;
}

export function worldTick() {
  Object.values(world.locations).forEach(location => {
    const result = worldLocationTick(location);

    result.deadCharacters.forEach((character) => {
      world.graveyard?.characters.push(character);
    });
  });
  world.year++;
}
