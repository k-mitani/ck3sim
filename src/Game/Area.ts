import { Terrain } from "./Terrain";

export class Area {
  constructor(
    public id: string,
    public terrain: Terrain,
    public culture: string,
    public faith: string,
    public development: number,
  ) {
  }
}
