import { useState } from 'react'
import './App.css'
import { Area } from './Game/Area';
import { Character } from './Game/Character';
import { GameCore } from './Game/GameCore';

let core = new GameCore();
await core.initialize();

function renderMap(core: GameCore, mode: MapMode, onAreaClick: (target: Area) => void) {
  let matrix = [];
  for (let row = 0; row < 9; row++) {
    matrix[row] = core.areas
      .slice(row * 9, row * 9 + 9)
      .map(area => {
        let color = "#ccc";
        let text = area.id;
        switch (mode) {
          case MapMode.Terrain:
            color = area.terrain.color;
            break;
          case MapMode.Ruler:
            color = core.rulerOf(area).color;
            break;
          case MapMode.Country:
            color = core.topRulerOf(area).color;
            break;
          case MapMode.Culture:
            color = core.rulerOf(area).color;
            text = area.culture;
            break;
          case MapMode.Faith:
            color = core.rulerOf(area).color;
            text = area.faith;
            break;
          case MapMode.Development:
            color = core.rulerOf(area).color;
            text = area.development.toString();
            break;
          default:
            break;
        }
        return { area, color, text }
      });
  }
  return (
    <div className="MainMap">
      {matrix.map((row, i) => (<div key={i}>
        {row.map(cell => <span
          className="MainMap-cell"
          key={cell.area.id}
          onClick={() => onAreaClick(cell.area)}
          style={{ backgroundColor: cell.color }}>
          <span className="MainMap-cell-inner">
            {cell.text}
          </span>
        </span>)}
      </div>))}
    </div>
  );
}

function renderCharacterDetail(core: GameCore, chara: Character) {
  let highestTitleArea = "";
  let highestTitleRank = "";
  return (
    <div className="CharacterDetail">
      <div>
        <span>{highestTitleArea}{highestTitleRank} {chara.name}</span>
        <span className='age'>{chara.age}???</span>
        <span className='health'>???</span>
      </div>

      <div>
        <span className='relation'>
          ???????????????
        </span>
        <span className="sexuality">??????</span>
      </div>

      <div className="traits">
        {chara.traits.map(trait => (<span className='trait'>
          <span>{trait}</span>
        </span>))}
      </div>

      <div>
        <div className='capability'>
          <div className='capability-column'><div>??????</div><div>{chara.diplomacy}</div></div>
          <div className='capability-column'><div>??????</div><div>{chara.martial}</div></div>
          <div className='capability-column'><div>??????</div><div>{chara.stewardship}</div></div>
          <div className='capability-column'><div>??????</div><div>{chara.intrigue}</div></div>
          <div className='capability-column'><div>??????</div><div>{chara.learning}</div></div>
          <div className='capability-column'><div>??????</div><div>{chara.prowness}</div></div>
        </div>
        <div className='personal'>
          <div>{chara.faith}</div>
          <div>{chara.culture}</div>
          <div>{chara.house}</div>
        </div>
      </div>

      <div>
      <div className='asset'>
          <div className='asset-column'><div>??????</div><div>{0}</div></div>
          <div className='asset-column'><div>??????</div><div>{0}</div></div>
          <div className='asset-column'><div>??????</div><div>{0}</div></div>
          <div className='asset-column'><div>??????</div><div>{0}</div></div>
          <div className='asset-column'><div>??????</div><div>{chara.getTotalSoldiers(core)}</div></div>
        </div>
      </div>
    </div>
  );
}

enum MapMode {
  Terrain,
  Ruler,
  Country,
  Culture,
  Faith,
  Development
}

function App() {
  const [mapMode, setMapMode] = useState(MapMode.Ruler);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  function onAreaClick(area: Area) {
    let chara = core.rulerOf(area);
    setSelectedCharacter(chara);
  }

  return (
    <div className="App">
      {renderMap(core, mapMode, onAreaClick)}
      {selectedCharacter && renderCharacterDetail(core, selectedCharacter)}
      <div>
        <h3>??????????????????????????????: {mapMode}???</h3>
        <div>
          <button onClick={() => setMapMode(MapMode.Terrain)}>??????</button>
          <button onClick={() => setMapMode(MapMode.Ruler)}>??????</button>
          <button onClick={() => setMapMode(MapMode.Country)}>???</button>
          <button onClick={() => setMapMode(MapMode.Culture)}>??????</button>
          <button onClick={() => setMapMode(MapMode.Faith)}>??????</button>
          <button onClick={() => setMapMode(MapMode.Development)}>?????????</button>
        </div>
      </div>
    </div>
  )
}

export default App
