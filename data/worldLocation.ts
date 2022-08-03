import {Character} from "./character";
import {getRandom} from "./getRandom";
import {world} from "./world";

let nextId = 1;
interface TickResult {
  deadCharacters: Character[];
}

export class WorldLocation {
  id = (nextId++).toString();
  type = "town";
  name: string;
  characters: Character[] = [];

  constructor(name: string) {
    this.name = name;
  }

  generateCharacters() {
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
    const result: TickResult = {deadCharacters: []};

    characters.forEach(character => {
      if (character.isDead) {
        return;
      }

      if (getRandom(120 - character.age) < 1) {
        character.isDead = true;
        result.deadCharacters.push(character);

        return;
      }

      character.age++;

      if (!character.partnerId && getRandom(100 - character.age) === 0) {
        const partner = characters.find(possiblePartner => !possiblePartner.partnerId && possiblePartner.id !== character.id);

        if (partner) {
          character.merry(partner);
        }
      }

      if (character.partnerId && getRandom(character.age / 10)) {
        const child = character.addChild();

        world.characters[child.id] = child;
        this.characters.push(child);
      }
    });

    this.characters = this.characters.filter(character => !result.deadCharacters.some(char => char.id === character.id));

    return result;
  }
}
