export class Terrain {
  static terrains: { [key: string]: Terrain } = {
    "険しい山": new Terrain("険しい山", "#888"),
    "山": new Terrain("山", "#801"),
    "丘陵": new Terrain("丘陵", "#b85"),
    "平野": new Terrain("平野", "#eea"),
    "森": new Terrain("森", "#040"),
    "湿地": new Terrain("湿地", "#08a"),
  }
  static of(terrainId: string): Terrain {
    return this.terrains[terrainId];
  }
  constructor(
    public name: string,
    public color: string,
  ) {
  }
}
