"use strict";

const cell = function () {
  let token = "";
  const setToken = (newToken) => (token = newToken);
  const getToken = () => token;

  return { setToken, getToken };
};

function player(name, symbol) {
  return { name, symbol };
}

const gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const gameboard = [];

  for (let i = 0; i < rows; i++) {
    gameboard.push([]);
    for (let j = 0; j < columns; j++) {
      gameboard[i].push(cell());
    }
  }

  const display = function () {
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        const cell = document.querySelector(`.y-${i}.x-${j}`);
        switch (gameboard[i][j].getToken()) {
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

  const setGameboardCell = function (e) {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    gameboard[row][column].setToken();
  };

  return { display, setGameboardCell };
})();

const game = (function () {
  const gameDiv = document.querySelector(".game");
  gameDiv.addEventListener("click", gameboard.setGameboardCell);

  gameboard.display();
})();
