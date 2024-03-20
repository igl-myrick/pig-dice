// Lobby business logic
function Lobby() {
  this.player1 = { overallScore: 0, turnScore: 0 };
  this.player2 = { overallScore: 0, turnScore: 0 };
  this.currentPlayer = "player1";
}

Lobby.prototype.setTurn = function(player) {
  if (player === "player1") {
    this.currentPlayer = "player1";
  } else {
    this.currentPlayer = "player2";
  }
};

Lobby.prototype.addOverallScore = function() {
  this[this.currentPlayer].overallScore = this[this.currentPlayer].overallScore + this[this.currentPlayer].turnScore;
}

Lobby.prototype.addTurnScore = function(numToAdd) {
  // shorthand of next line
  // this[this.currentPlayer].turnScore += numToAdd;
  this[this.currentPlayer].turnScore = this[this.currentPlayer].turnScore + numToAdd;
}

Lobby.prototype.handleTurn = function() {
  const userRoll = Math.floor(Math.random() * 6) + 1;
  if (userRoll !== 1) {
    this.addTurnScore(userRoll);
    return userRoll;
  } else {
    this[this.currentPlayer].turnScore = 0;
    return 1;
  }
}

// program business logic
let newLobby = new Lobby();

// ui logic
function handleFormSubmission(e) {
  e.preventDefault();
  const playerSelection = document.querySelector("input[name='order']:checked").value;
  if (playerSelection === "player-1") {
    newLobby.setTurn("player1");
  } else {
    newLobby.setTurn("player2");
  }
  if (newLobby.currentPlayer === "player1") {
    document.getElementById("player-1-buttons").classList.remove("hidden");
  } else {
    document.getElementById("player-2-buttons").classList.remove("hidden");
  }
  const selectionDiv = document.getElementById("selection");
  selectionDiv.remove();
  const gameDiv = document.getElementById("game"); 
  gameDiv.classList.remove("hidden");
}

function changeTurn() {
  const player1Button = document.getElementById("player-1-buttons");
  const player2Button = document.getElementById("player-2-buttons");
  if (newLobby.currentPlayer === "player1") {
    newLobby.player1.turnScore = 0;
    player1Button.classList.add("hidden");
    player2Button.classList.remove("hidden");
    newLobby.setTurn("player2");
  } else {
    newLobby.player2.turnScore = 0;
    player2Button.classList.add("hidden");
    player1Button.classList.remove("hidden");
    newLobby.setTurn("player1");
  }
}

function displayDieRoll() {
  const turnResult = newLobby.handleTurn();
  if (newLobby.currentPlayer === "player1") {
    document.getElementById("player-1-history").innerText = turnResult;
    if (turnResult === 1) {
      document.getElementById("player-1-score").innerText = newLobby.player1.overallScore;
      changeTurn();
    } else {
      document.getElementById("player-1-score").innerText = newLobby.player1.overallScore + newLobby.player1.turnScore;
    }
  } else {
    document.getElementById("player-2-history").innerText = turnResult;
    if (turnResult === 1) {
      document.getElementById("player-2-score").innerText = newLobby.player2.overallScore;
      changeTurn();
    } else {
      document.getElementById("player-2-score").innerText = newLobby.player2.overallScore + newLobby.player2.turnScore;
    }
  }
  if ((newLobby.player1.overallScore + newLobby.player1.turnScore) >= 100 || (newLobby.player2.overallScore + newLobby.player2.turnScore) >= 100) {
    const player1Button = document.getElementById("player-1-buttons");
    const player2Button = document.getElementById("player-2-buttons");
    player1Button.classList.add("hidden");
    player2Button.classList.add("hidden");
    const gameOverDiv = document.getElementById("game-over");
    const resultsDiv = document.getElementById("results");
    gameOverDiv.classList.remove("hidden");
    if ((newLobby.player1.overallScore + newLobby.player1.turnScore) >= 100) {
      resultsDiv.innerText = "Player 1 wins";
    } else {
      resultsDiv.innerText = "Player 2 wins";
    }
  }
}

function handleHold() {
  newLobby.addOverallScore();
  changeTurn();
}

function resetGame() {
  location.reload();
}

window.addEventListener("load", function() {
  document.querySelector("form").addEventListener("submit", handleFormSubmission);
  document.getElementById("player-1-roll").addEventListener("click", displayDieRoll);
  document.getElementById("player-1-hold").addEventListener("click", handleHold);
  document.getElementById("player-2-roll").addEventListener("click", displayDieRoll);
  document.getElementById("player-2-hold").addEventListener("click", handleHold);
  document.getElementById("reset-button").addEventListener("click", resetGame);
});