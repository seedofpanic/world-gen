import {getRandom} from "./getRandom";
import {world} from "./world";

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
  children: Character[] = [];

  constructor({gender, partnerId, ageMin, ageMax}: {gender?: Character["gender"], partnerId?: Character["partnerId"], ageMin?: number, ageMax?: number}) {
    this.gender = gender || (getRandom(2) === 0 ? "F" : "M");
    this.name = humanNames[this.gender][getRandom(humanNames[this.gender].length)];
    this.sname = humanSNames[getRandom(humanSNames.length)];
    this.partnerId = partnerId;
    this.age = getRandom(ageMax || 120) + (ageMin || 0);
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

  addChild() {
    const child = new Character({ageMax: 0});

    this.children.push(child);

    if (this.partnerId) {
      world.characters[this.partnerId].children.push(child)
    }

    return child;
  }
}
