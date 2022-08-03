import {getRandom} from "./getRandom";
import {world} from "./db";

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

const humanNames: { [name: string]: string[] } = {
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

export interface LogEvent {
  year: number,
  message: string
}

export interface Character {
  id: string;
  name: string;
  sname: string;
  gender: "M" | "F";
  partnerId?: string;
  age: number;
  children: string[];
  parents: string[];
  isDead: boolean;
  log: LogEvent[];
}

export function characterCreate({gender, partnerId, ageMin, ageMax}: { gender?: Character["gender"], partnerId?: Character["partnerId"], ageMin?: number, ageMax?: number }): Character {
  const generatedGender = gender || (getRandom(2) === 0 ? "F" : "M");

  return {
    id: (world.nextId++).toString(),
    children: [],
    isDead: false,
    parents: [],
    gender: generatedGender,
    name: humanNames[generatedGender][getRandom(humanNames[generatedGender].length)],
    sname: humanSNames[getRandom(humanSNames.length)],
    partnerId: partnerId,
    age: getRandom(ageMax === undefined ? 120 : (ageMax - (ageMin || 0))) + (ageMin || 0),
    log: []
  }
}

export function characterMarry(self: Character, partner: Character) {
  self.partnerId = partner.id;
  partner.partnerId = self.id;

  self.log.push({
    year: world.year,
    message: `married ${partner.name} ${partner.sname}`
  });

  if (partner.gender === "F") {
    partner.sname = self.sname;
  }

  if (self.gender === "F") {
    self.sname = partner.sname;
  }
}

export function characterAddChild(self: Character, maxAge ?: number) {

  let ageYoungerParent = self.age;

  if (self.partnerId) {
    ageYoungerParent = Math.min(self.age, world.characters[self.partnerId].age)
  }

  const child = characterCreate({ageMax: maxAge === undefined ? (ageYoungerParent - 17) : maxAge});

  self.children.push(child.id);
  child.parents.push(self.id);

  if (self.partnerId) {
    world.characters[self.partnerId].children.push(child.id);
    child.parents.push(self.partnerId);
    child.sname = world.characters[self.partnerId].sname
  }

  world.characters[child.id] = child;

  addToLog(self, `Got a child ${child.name}`);
  if (self.partnerId) {
    addToLog(world.characters[self.partnerId], `Got a child ${child.name}`);
  }
  addToLog(child, 'Was born');

  return child;
}

export function addToLog(self: Character, message: string) {
  self.log.push({
    year: world.year,
    message
  });
}
