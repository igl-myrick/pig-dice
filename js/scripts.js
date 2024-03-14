// Lobby business logic
function Lobby() {
  this.player1 = { currentScore: 0, isTurn: true };
  this.player2 = { currentScore: 0, isTurn: false };
}

Lobby.prototype.setTurn = function(player) {
  if (player === "player1") {
    this.player1.isTurn = true;
    this.player2.isTurn = false;
  } else {
    this.player1.isTurn = false;
    this.player2.isTurn = true;
  }
};

Lobby.prototype.updateScore = function(numToAdd) {
  if (this.player1.isTurn === true) {
    this.player1.currentScore = this.player1.currentScore + numToAdd;
  } else {
    this.player2.currentScore = this.player2.currentScore + numToAdd; 
  }
};

// program business logic
let newLobby = new Lobby();

function rollDie() {
  let result = Math.floor(Math.random() * 6)
  return result + 1;
}

// ui logic
function handleFormSubmission(e) {
  e.preventDefault();
  const playerSelection = document.querySelector("input[name='order']:checked").value;
  if (playerSelection === "player-1") {
    newLobby.setTurn("player1")
  } else {
    newLobby.setTurn("player2")
  }
  let currentTurn = newLobby.player1.isTurn;
  if (currentTurn === true) {
    document.getElementById("player-1-button").classList.remove("hidden");
  } else {
    document.getElementById("player-2-button").classList.remove("hidden");
  }
  const selectionDiv = document.getElementById("selection");
  selectionDiv.remove();
  const gameDiv = document.getElementById("game"); 
  gameDiv.classList.remove("hidden");
}

function changeTurn() {
  let currentTurn = newLobby.player1.isTurn;
  const player1Button = document.getElementById("player-1-button");
  const player2Button = document.getElementById("player-2-button");
  if (currentTurn === true) {
    player1Button.classList.add("hidden");
    player2Button.classList.remove("hidden");
    newLobby.setTurn("player2");
  } else {
    player2Button.classList.add("hidden");
    player1Button.classList.remove("hidden");
    newLobby.setTurn("player1");
  }
}

function handleDieRoll() {
  const currentPlayer = newLobby.player1.isTurn;
  let userRoll = rollDie();
  if (currentPlayer === true) {
    document.getElementById("player-1-history").innerText = userRoll;
    if (userRoll > 1) {
      newLobby.player1.currentScore = newLobby.player1.currentScore + userRoll;
      const scoreDisplay = document.getElementById("player-1-score");
      scoreDisplay.innerText = newLobby.player1.currentScore;
    } else {
      changeTurn();
    }
  } else {
    document.getElementById("player-2-history").innerText = userRoll;
    if (userRoll > 1) {
      newLobby.player2.currentScore = newLobby.player2.currentScore + userRoll;
      const scoreDisplay = document.getElementById("player-2-score");
      scoreDisplay.innerText = newLobby.player2.currentScore;
    } else {
      changeTurn();
    }
  }
  if (newLobby.player1.currentScore >= 100 || newLobby.player2.currentScore >= 100) {
    const player1Button = document.getElementById("player-1-button");
    const player2Button = document.getElementById("player-2-button");
    player1Button.classList.add("hidden");
    player2Button.classList.add("hidden");
    const gameOverDiv = document.getElementById("game-over")
    const resultsDiv = document.getElementById("results")
    gameOverDiv.classList.remove("hidden");
    if (newLobby.player1.currentScore >= 100) {
      resultsDiv.innerText = "Player 1 wins";
    } else {
      resultsDiv.innerText = "Player 2 wins";
    }
  }
}

function resetGame() {
  location.reload();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
  document.getElementById("player-1-button").addEventListener("click", handleDieRoll);
  document.getElementById("player-2-button").addEventListener("click", handleDieRoll);
  document.getElementById("reset-button").addEventListener("click", resetGame);
});