// Game Messages
const gameResult = document.getElementById("game-result");
const currentPlayerDisplay = document.getElementById("current-player");
const errorMsg = document.getElementById("errorMsg");

// Board Positions
const position1 = document.getElementById("position-1");
const position2 = document.getElementById("position-2");
const position3 = document.getElementById("position-3");
const position4 = document.getElementById("position-4");
const position5 = document.getElementById("position-5");
const position6 = document.getElementById("position-6");
const position7 = document.getElementById("position-7");
const position8 = document.getElementById("position-8");
const position9 = document.getElementById("position-9");

// Game Board
const board = [
  position1,
  position2,
  position3,
  position4,
  position5,
  position6,
  position7,
  position8,
  position9,
];

// Game State disables moves after win
let gameState = true;

// Reset Button
const resetBtn = document.getElementById("reset");
resetBtn.onclick = reset;

// Players
const player1 = { name: "Player One", symbol: "X" };
const player2 = { name: "Player Two", symbol: "O" };

// Who Goes First
function firstPlayer(player1, player2) {
  const player = Math.floor(Math.random() * 2);
  const currentPlayer = player >= 1 ? player1 : player2;
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer.name} - ${currentPlayer.symbol}`;
  return currentPlayer;
}

let currentPlayer = firstPlayer(player1, player2);

// Switch players and update currentPlayerDisplay
function switchPlayer() {
  if (currentPlayer.symbol === "X") {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer.name} - ${currentPlayer.symbol}`;
}

// Reset the game
function reset() {
  board.forEach((position) => {
    position.replaceChildren();
    position.dataset.symbol = "";
  });
  currentPlayer = firstPlayer(player1, player2);
  gameResult.textContent = "";
  errorMsg.textContent = "";
  gameState = true;
}

// Check for a winner or a tie
function checkWinner(currentPlayer) {
  // Rows
  const row1 = [
    position1.dataset.symbol,
    position2.dataset.symbol,
    position3.dataset.symbol,
  ];
  const row2 = [
    position4.dataset.symbol,
    position5.dataset.symbol,
    position6.dataset.symbol,
  ];
  const row3 = [
    position7.dataset.symbol,
    position8.dataset.symbol,
    position9.dataset.symbol,
  ];
  const rows = [row1, row2, row3];

  // Columns
  const column1 = [
    position1.dataset.symbol,
    position4.dataset.symbol,
    position7.dataset.symbol,
  ];
  const column2 = [
    position2.dataset.symbol,
    position5.dataset.symbol,
    position8.dataset.symbol,
  ];
  const column3 = [
    position3.dataset.symbol,
    position6.dataset.symbol,
    position9.dataset.symbol,
  ];
  const columns = [column1, column2, column3];

  // Diagonals
  const diagonal1 = [
    position1.dataset.symbol,
    position5.dataset.symbol,
    position9.dataset.symbol,
  ];
  const diagonal2 = [
    position3.dataset.symbol,
    position5.dataset.symbol,
    position7.dataset.symbol,
  ];
  const diagonals = [diagonal1, diagonal2];

  // Check Rows
  rows.forEach((row) => {
    if (
      row[0] === currentPlayer.symbol &&
      row[1] === currentPlayer.symbol &&
      row[2] === currentPlayer.symbol
    ) {
      gameResult.textContent = `${currentPlayer.name} - ${currentPlayer.symbol} is the Winner!`;
      gameState = false;
    }
  });

  // Check Columns
  columns.forEach((column) => {
    if (
      column[0] === currentPlayer.symbol &&
      column[1] === currentPlayer.symbol &&
      column[2] === currentPlayer.symbol
    ) {
      gameResult.textContent = `${currentPlayer.name} - ${currentPlayer.symbol} is the Winner!`;
      gameState = false;
    }
  });

  // Check diagonals
  diagonals.forEach((diagonal) => {
    if (
      diagonal[0] === currentPlayer.symbol &&
      diagonal[1] === currentPlayer.symbol &&
      diagonal[2] === currentPlayer.symbol
    ) {
      gameResult.textContent = `${currentPlayer.name} - ${currentPlayer.symbol} is the Winner!`;
      gameState = false;
    }
  });
}

// Game Board Event Listener
board.forEach((position) => {
  position.addEventListener("click", () => {
    // Player Icons
    const iconX = document.createElement("img");
    iconX.src = "images/x.png";
    iconX.classList.add("icon-X");
    const iconO = document.createElement("img");
    iconO.src = "images/o.png";
    iconO.classList.add("icon-O");

    // Reset gameResult content
    errorMsg.textContent = "";

    //Check if game is over
    if (gameState === false) {
      errorMsg.textContent = "Reset for New Game!";
      return;
    }

    // Check for open space
    if (position.innerHTML === "" && gameState === true) {
      if (currentPlayer.symbol === "X") {
        position.appendChild(iconX);
        position.dataset.symbol = "X";
      } else {
        position.appendChild(iconO);
        position.dataset.symbol = "O";
      }
      checkWinner(currentPlayer);
      switchPlayer();
    } else {
      // Error message if space taken
      errorMsg.textContent = "Space Taken!";
    }
  });
});
