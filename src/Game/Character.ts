import { Area } from "./Area";
import { GameCore } from "./GameCore";

export class Character {
  constructor(
    public id: string,
    public name: string,
    public color: string,
    public master: Character | null,
    public titles: Area[],
    public age: number,
    public diplomacy: number,
    public martial: number,
    public stewardship: number,
    public intrigue: number,
    public learning: number,
    public prowness: number,
    public traits: string[],
    public perkCount: number,
    public culture: string,
    public faith: string,
    public house: string,
  ) {
  }

  getTotalSoldiers(core: GameCore): number {
    let total = 0;

    // 自分の領地の兵数を合計する。
    this.titles.forEach(title => {
      total += title.development * 100;
    });

    // 封臣の供出兵の兵数を合計する。
    core.characters.forEach(chara => {
      if (chara.master === this) {
        chara.titles.forEach(title => {
          title.development * 100 * 0.1;
        });
        // TODO 封臣の封臣の供出兵の計算
      }
    });

    var modifier = 1;
    // 自身が封臣なら、1割は主君に供出するので除外する。
    if (this.master != null) modifier *= 0.9;
    // 軍事レベルに応じて増減させる。
    modifier *= 1 + (this.martial - 5) * 2 / 100

    return Math.floor(total * modifier);
  }
}
