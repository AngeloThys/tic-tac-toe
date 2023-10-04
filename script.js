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
    console.log(this.gameboard);
    for (let i = 0; i < this.gameboard.length; i++) {
      for (let j = 0; j < this.gameboard[i].length; j++) {
        const cell = document.querySelector(`.y-${i}.x-${j}`);
        console.log(`.y-${i}.x-${j}`);
        cell.textContent = this.gameboard[i][j];
      }
    }
  };
  return {
    gameboard: gameboard,
    display: display
  };
})();

function player(name, symbol) {
  return { name, symbol };
}

gameboard.display()