import { Area } from "./Area";
import { Character } from "./Character";
import { Terrain } from "./Terrain";

async function loadAreas(): Promise<Array<Area>> {
  let res = await fetch("Areas.csv");
  let rawText = await res.text();
  let [header, ...lines] = rawText.split("\n");
  return lines.map(l => {
    let cols = l.trim().split(",");
    return new Area(
      cols[0],
      Terrain.of(cols[1]),
      cols[2],
      cols[3],
      parseInt(cols[4]),
    );
  });
}

async function loadCharacters(core: GameCore): Promise<Array<Character>> {
  let res = await fetch("Characters.csv");
  let rawText = await res.text();
  let [header, ...lines] = rawText.trim().split("\n");

  let masterTable: {[key: string]: string} = {};
  // CSVをパースする。
  let characters = lines.map(l => {
    let cols = l.trim().split(",");
    masterTable[cols[0]] = cols[3];
    console.log(cols)
    return new Character(
      cols[0],
      cols[1],
      cols[2],
      null,
      cols[4].split(" ").filter(x => x !== "").map(id => core.areaOf(id)),
      parseInt(cols[5]),
      parseInt(cols[6]),
      parseInt(cols[7]),
      parseInt(cols[8]),
      parseInt(cols[9]),
      parseInt(cols[10]),
      parseInt(cols[11]),
      [cols[12], ...cols[13].split(" "), ...cols[14].split(" "), ...cols[15].split(" ")].filter(x => x !== ""),
      parseInt(cols[16]),
      cols[17],
      cols[18],
      cols[19],
    );
  });

  // masterをセットする。
  characters.forEach(c => {
    let masterName = masterTable[c.id];
    let master = characters.find(c => c.name === masterName);
    c.master = master ?? null;
  });

  return characters;
}

export class GameCore {
  areas!: Area[];
  areaOf(areaId: string): Area {
    let area = this.areas.find(a => a.id === areaId);
    if (area == null) throw new Error(`${areaId} not found`);
    return area;
  }
  rulerOf(area: Area): Character {
    let character = this.characters.find(c => c.titles.indexOf(area) >= 0);
    if (character == null) throw new Error(`${area.id}'s ruler not found`);
    return character;
  }
  topRulerOf(area: Area): Character {
    let ruler = this.rulerOf(area);
    while (ruler.master != null) ruler = ruler.master;
    return ruler;
  }

  characters!: Character[];
  characterOf(characterId: string): Character {
    let character = this.characters.find(a => a.id === characterId);
    if (character == null) throw new Error(`${characterId} not found`);
    return character;
  }

  constructor() {
  }

  async initialize() {
    this.areas = await loadAreas();
    this.characters = await loadCharacters(this);
  }
}