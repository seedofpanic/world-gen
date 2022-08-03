import {addToLog, Character, characterAddChild, characterCreate, characterMarry} from "./character";
import {getRandom} from "./getRandom";
import {world} from "./db";

interface TickResult {
  deadCharacters: Character[];
}

export interface WorldLocation {
  id: string,
  type: string,
  name: string,
  characters: Character[];
}

export function worldLocationCreate(name: string): WorldLocation {
  return {
    id: (world.nextId++).toString(),
    type: "town",
    name: name,
    characters: []
  }
}

export function worldLocationGenerateCharacters(worldLocation: WorldLocation) {
  for (let i = 0; i < 5; i++) {
    const f = characterCreate({gender: "F", ageMin: 20, ageMax: 50});
    const m = characterCreate({gender: "M", ageMin: 20, ageMax: 50});

    world.characters[f.id] = f;
    world.characters[m.id] = m;

    worldLocation.characters.push(f);
    worldLocation.characters.push(m);

    characterMarry(f, m);

    const child = characterAddChild(m);
    worldLocation.characters.push(child);
  }
}

export function worldLocationTick(worldLocation: WorldLocation) {
  const characters = Object.values(worldLocation.characters);
  const result: TickResult = {deadCharacters: []};

  characters.forEach(character => {
    if (character.isDead) {
      return;
    }

    if (getRandom(120 - character.age) < 1) {
      character.isDead = true;
      result.deadCharacters.push(character);
      addToLog(character, "died");

      return;
    }

    character.age++;

    if (!character.partnerId && character.age > 14 && getRandom(100 - character.age) === 0) {
      const partner = characters.find(possiblePartner => !possiblePartner.partnerId && possiblePartner.id !== character.id);

      if (partner) {
        characterMarry(character, partner);
      }
    }

    if (character.gender === "F") {
      if (character.partnerId && character.age > 10 && character.age < 50 && getRandom(character.age / 5) === 0) {
        const child = characterAddChild(character, 0);

        world.characters[child.id] = child;
        worldLocation.characters.push(child);
      }
    }
  });

  worldLocation.characters = worldLocation.characters.filter(character => !result.deadCharacters.some(char => char.id === character.id));

  return result;
}
