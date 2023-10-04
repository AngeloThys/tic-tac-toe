"use strict";

const game = (function () {
  return {};
})();

const gameboard = (function () {
  const gameboard = [
    ["x", "x", "o"],
    ["o", "o", "x"],
    ["x", "o", "x"],
  ];
  const display = function () {
    for (let i = 0; i < this.gameboard.length; i++) {
      for (let j = 0; j < this.gameboard[i].length; j++) {
        const cell = document.querySelector(`.y-${i}.x-${j}`);
        switch (this.gameboard[i][j]) {
          case "x":
            cell.innerHTML =
              "<span class='close material-symbols-outlined'>close</span>";
            break;
          case "o":
            cell.innerHTML =
              "<span class='circle material-symbols-outlined'>circle</span>";
            break;
        }
      }
    }
  };
  return {
    gameboard: gameboard,
    display: display,
  };
})();

function player(name, symbol) {
  return { name, symbol };
}

gameboard.display();
