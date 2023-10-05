"use strict";

const cell = function () {
  let token = "";
  const setToken = (newToken) => (token = newToken);
  const getToken = () => token;

  return { setToken, getToken };
};

const player = function () {
  const username = "";
  const token = "";
  const setUsername = (newUsername) => (username = newUsername);
  const getUserName = () => username;
  const setToken = (newToken) => (token = newToken);
  const getToken = () => token;

  return { setUsername, getUserName, setToken, getToken };
};

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

  const setCell = function (player, e) {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    gameboard[row][column].setToken(player.getToken());
  };

  return { display, setCell };
})();

const game = (function () {
  const newGameButton = document.querySelector(".new-game");
  const dialog = document.querySelector("dialog");
  newGameButton.addEventListener("click", () => dialog.showModal());
  // Allows for the dialog to be closed by clicking outside of it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  const gameDiv = document.querySelector(".game");
  gameDiv.addEventListener("click", (e) => {
    gameboard.setCell("player-1", e); // Modify player-1 to hold the current player
  });

  gameboard.display();
})();
