import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const characters = [
    {
      "name": "alpha",
      "color": "#800",
      "master": null,
      "cells": [
        "0-0", "1-0", "2-0", "3-0", "4-0", "5-0", "6-0", "7-0", "8-0",
        "0-1", "1-1", "2-1", "3-1", "4-1", "5-1", "6-1", "7-1", "8-1",
        "0-2", "1-2", "2-2", "3-2", "4-2", "5-2", "6-2", "7-2", "8-2",
        "0-3", "1-3", "2-3", "3-3", "4-3", "5-3", "6-3", "7-3", "8-3",
        "0-4", "1-4", "2-4", "3-4", "4-4", "5-4",
        "0-5", "1-5", "2-5", "3-5", "4-5",
      ],
    },
    {
      "name": "beta",
      "color": "#080",
      "master": null,
      "cells": [
        "6-4", "7-4", "8-4",
        "5-5", "6-5", "7-5", "8-5",
        "4-6", "5-6", "6-6", "7-6", "8-6",
        "4-7", "5-7", "6-7", "7-7", "8-7",
        "4-8", "5-8", "6-8", "7-8", "8-8",
      ],
    },
    {
      "name": "charlie",
      "color": "#008",
      "master": null,
      "cells": [
        "0-6", "1-6", "2-6", "3-6",
        "0-7", "1-7", "2-7", "3-7",
        "0-8", "1-8", "2-8", "3-8",
      ],
    },
  ];

  var cellArray = Array<any>();
  var world = [];
  for (let y = 0; y < 9; y++) {
    world[y] = Array<any>();
    for (let x = 0; x < 9; x++) {
      const cell = world[y][x] = {
        name: `${x}-${y}`,
        id: x + y * 9,
      };
      cellArray.push(cell);
    }
  }

  // 支配者マップを構築する。
  cellArray.forEach(cell => {
    const owner = characters.find(c => c.cells.indexOf(cell.name) >= 0);
    cell.owner = owner;
    cell.color = owner?.color;
  });



  return (
    <div className="App">
      <div className="MainMap">
        {world.map((row, i) => (<div key={i}>
          {row.map(cell => <span
            className="MainMap-cell"
            key={cell.id}
            style={{ backgroundColor: cell.color }}>
            <span className="MainMap-cell-inner">
              {cell.id}&nbsp;
            </span>
          </span>)}
        </div>))}
      </div>
    </div>
  )
}

export default App
