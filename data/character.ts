import {getRandom} from "./getRandom";
import {world} from "./world";
import {number} from "prop-types";

const humanSNames = [
  "Nuko",
  "Pahem",
  "Horsevalor",
  "Oattoe",
  "Seg",
  "Korgirsk",
  "Fullhorn",
  "Spiritshout",
  "Bezrahpihk",
  "Huhrub",
  "Ryarebuvro",
  "Vyevzerku",
  "Piao",
  "Lay",
  "Jogodrin",
  "Pedrani",
  "Dhuhru",
  "Khakhi",
  "Threewood",
  "Shadespark",
  "Shug",
  "Kargog",
  "Saurforce",
  "Hallowedfeather",
  "Nilriltrehr",
  "Nekrihk",
  "Chotrulzoka",
  "Nurone",
  "Cia",
  "Juem",
  "Selulo",
  "Jecergor"
];

const humanNames = {
  "F": [
    "Meruhruh",
    "Feisah",
    "Sheervildruh",
    "Shesse",
    "Karlos",
    "Zo",
    "Kistrirhey",
    "Aloy",
    "Nifina",
    "Linu",
    "Thavuvlas",
    "Thuvi",
    "Cei",
    "Tia",
    "Bolml",
    "Lilm"
  ], "M": [
    "Neben",
    "Khemun",
    "Stue",
    "Olom",
    "Fodar",
    "Rim",
    "Erbon",
    "Blam",
    "Ko-Ro-Vuf",
    "Zotos",
    "Ganderlek",
    "Fitved",
    "Wim",
    "Thiom",
    "Chieruviel",
    "Creanta"
  ]
};

let nextId = 1;

export class Character {
  id = (nextId++).toString();
  name: string;
  sname: string;
  gender: "M" | "F";
  partnerId?: string;
  age: number;
  children: string[] = [];
  parents: string[] = [];
  isDead = false;

  constructor({gender, partnerId, ageMin, ageMax}: {gender?: Character["gender"], partnerId?: Character["partnerId"], ageMin?: number, ageMax?: number}) {
    this.gender = gender || (getRandom(2) === 0 ? "F" : "M");
    this.name = humanNames[this.gender][getRandom(humanNames[this.gender].length)];
    this.sname = humanSNames[getRandom(humanSNames.length)];
    this.partnerId = partnerId;
    this.age = getRandom(ageMax === undefined ? 120 : (ageMax - (ageMin || 0))) + (ageMin || 0);

  }

  merry(partner: Character) {
    this.partnerId = partner.id;
    partner.partnerId = this.id;

    if (partner.gender === "F") {
      partner.sname = this.sname;
    }

    if (this.gender === "F") {
      this.sname = partner.sname;
    }
  }

  addChild(maxAge?: number) {

    let ageYoungerParent = this.age;

    if (this.partnerId) {
      ageYoungerParent = Math.min(this.age, world.characters[this.partnerId].age)
    }

    const child = new Character({ageMax: maxAge === undefined ? (ageYoungerParent - 17) : maxAge });

    this.children.push(child.id);
    child.parents.push(this.id);

    if (this.partnerId) {
      world.characters[this.partnerId].children.push(child.id);
      child.parents.push(this.partnerId);
      child.sname = world.characters[this.partnerId].sname
    }

    world.characters[child.id] = child;

    return child;
  }
}
