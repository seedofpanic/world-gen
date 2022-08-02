import {Character} from "./character";
import {getRandom} from "./getRandom";
import {world} from "./world";

let nextId = 1;
interface TickResult {
  children?: Character[]
}

export class WorldLocation {
  id = (nextId++).toString();
  type = "town";
  name: string;
  characters: Character[] = [];

  constructor() {
    this.name = "Agnir";

    for (let i = 0; i < 5; i++) {
      const f = new Character({gender: "F", ageMin: 20, ageMax: 50});
      const m = new Character({gender: "M", ageMin: 20, ageMax: 50});

      world.characters[f.id] = f;
      world.characters[m.id] = m;

      this.characters.push(f);
      this.characters.push(m);

      f.merry(m);

      const child = f.addChild();
      this.characters.push(child);
    }
  }

  tick() {
    const characters = Object.values(this.characters);
    const result: TickResult = {};
    characters.forEach(character => {
      if (!character.partnerId && getRandom(100 - character.age) === 0) {
        const partner = characters.find(possiblePartner => !possiblePartner.partnerId && possiblePartner.id !== character.id);

        if (partner) {
          character.merry(partner);
        }

        if (character.partnerId && getRandom(character.age / 10)) {
          const child = character.addChild();

          result.children = [child];
        }
      }
    });
  }
}
