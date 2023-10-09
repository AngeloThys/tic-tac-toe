"use strict";

const cell = function () {
  let token = "";
  const setToken = (newToken) => (token = newToken);
  const getToken = () => token;

  return { setToken, getToken };
};

const player = function (username, token) {
  let score = 0;
  const setUsername = (newUsername) => (username = newUsername);
  const getUserName = () => username;
  const setToken = (newToken) => (token = newToken);
  const getToken = () => token;
  const addWin = () => (score = score + 1);
  const getScore = () => score;

  return { setUsername, getUserName, setToken, getToken, addWin, getScore };
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
          case "":
            cell.innerHTML = "";
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
  // returns the token of the player with 3 in a row.
  const checkThree = function () {
    let cellOne = "";
    let cellTwo = "";
    let cellThree = "";
    // check each row
    for (let row = 0; row < 3; row++) {
      cellOne = gameboard[row][0];
      cellTwo = gameboard[row][1];
      cellThree = gameboard[row][2];
      if (
        cellOne.getToken() === cellTwo.getToken() &&
        cellOne.getToken() === cellThree.getToken()
      ) {
        return cellOne.getToken();
      }
    }
    // check each column
    for (let column = 0; column < 3; column++) {
      cellOne = gameboard[0][column];
      cellTwo = gameboard[1][column];
      cellThree = gameboard[2][column];
      if (
        cellOne.getToken() === cellTwo.getToken() &&
        cellOne.getToken() === cellThree.getToken()
      ) {
        return cellOne.getToken();
      }
    }
    // check both diagonals
    cellOne = gameboard[0][0];
    cellTwo = gameboard[1][1];
    cellThree = gameboard[2][2];
    if (
      cellOne.getToken() === cellTwo.getToken() &&
      cellOne.getToken() === cellThree.getToken()
    ) {
      return cellOne.getToken();
    }
    cellOne = gameboard[0][2];
    cellTwo = gameboard[1][1];
    cellThree = gameboard[2][0];
    if (
      cellOne.getToken() === cellTwo.getToken() &&
      cellOne.getToken() === cellThree.getToken()
    ) {
      return cellOne.getToken();
    }
  };

  const checkFull = function () {};
  // clears every cell individually
  const clear = function () {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gameboard[i][j].setToken("");
      }
    }
  };

  return { display, setCell, checkThree, checkFull, clear };
})();

const game = (function () {
  let playerOne, playerTwo;

  const newGameButton = document.querySelector(".new-game");
  const dialog = document.querySelector("dialog");
  newGameButton.addEventListener("click", () => dialog.showModal());
  // Allows for the dialog to be closed by clicking outside of it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  const getPlayerNames = function () {
    const playerNameOne = document.querySelector("#username-1").value;
    const playerNameTwo = document.querySelector("#username-2").value;

    return [playerNameOne, playerNameTwo];
  };

  const createPlayers = function (playerNameOne, playerNameTwo) {
    playerOne = player(playerNameOne, "x");
    playerTwo = player(playerNameTwo, "o");
  };

  const playGame = function (player) {
    let winner = "";

    const playerOneScore = document.querySelector(".player-1-score");
    const playerTwoScore = document.querySelector(".player-2-score");
    playerOneScore.textContent = playerOne.getScore();
    playerTwoScore.textContent = playerTwo.getScore();

    const gameDiv = document.querySelector(".game");
    gameDiv.addEventListener("click", (e) => {
      // we check if the cell is valid
      if (e.target.classList[0] === "cell") {
        // Changes the player each turn on correct cell click
        player = player === playerTwo ? playerOne : playerTwo;
        gameboard.setCell(player, e);
        gameboard.display();
      } else if (
        e.target.classList[0] === "circle" ||
        e.target.classList[0] === "close"
      ) {
        const dialog = document.querySelector(".new-cell");
        dialog.showModal();
        dialog.style.opacity = 0;
        dialog.addEventListener("transitionend", () => {
          dialog.close();
          dialog.style.opacity = 1;
        });
      }
      // checks if there is a three in a row: token type wins.
      const winnerToken = gameboard.checkThree();
      if (winnerToken) {
        const winnerH1 = document.querySelector(".winner");
        switch (winnerToken) {
          case "x":
            playerOne.addWin();
            winner = playerOne.getUserName();
            winnerH1.style.color = "var(--primary-blue)";
            break;
          case "o":
            playerTwo.addWin();
            winner = playerTwo.getUserName();
            winnerH1.style.color = "var(--primary-red)";
            break;
        }
        winnerH1.textContent = winner;
        const dialog = document.querySelector(".play-again");
        dialog.showModal();

        const playAgainButton = document.querySelector(".play-again .play");
        playAgainButton.addEventListener("click", () => {
          gameboard.clear();
          gameboard.display();
          dialog.close();
          let player = playerOne;
          playGame(player);
        });
      }
      // checks if the board is full: tie.
      gameboard.checkFull();
    });
  };

  const playButton = document.querySelector(".play-game .play");
  playButton.addEventListener("click", () => {
    createPlayers(...getPlayerNames());
    dialog.close();
    let player = playerTwo;
    playGame(player);
  });

  return {};
})();
