// Lobby business logic
function Lobby() {
  this.player1 = { overallScore: 0, turnScore: 0, lastRoll: 0, isTurn: true };
  this.player2 = { overallScore: 0, turnScore: 0, lastRoll: 0, isTurn: false };
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

Lobby.prototype.addOverallScore = function() {
  if (this.player1.isTurn === true) {
    this.player1.overallScore = this.player1.overallScore + this.player1.turnScore;
  } else {
    this.player2.overallScore = this.player2.overallScore + this.player2.turnScore;
  }
}

Lobby.prototype.addTurnScore = function(numToAdd) {
  if (this.player1.isTurn === true) {
    this.player1.turnScore = this.player1.turnScore + numToAdd;
  } else {
    this.player2.turnScore = this.player2.turnScore + numToAdd;
  }
}

Lobby.prototype.handleTurn = function() {
  const userRoll = Math.floor(Math.random() * 6) + 1;
  if (this.player1.isTurn === true) {
    if (userRoll !== 1) {
      this.addTurnScore(userRoll);
      return userRoll;
    } else {
      this.player1.turnScore = 0;
      return 1;
    }
  } else {
    if (userRoll !== 1) {
      this.addTurnScore(userRoll);
      return userRoll;
    } else {
      this.player2.turnScore = 0;
      return 1;
    }
  }
}

// program business logic
let newLobby = new Lobby();

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
  let currentTurn = newLobby.player1.isTurn;
  const player1Button = document.getElementById("player-1-buttons");
  const player2Button = document.getElementById("player-2-buttons");
  if (currentTurn === true) {
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
  if (newLobby.player1.isTurn === true) {
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
    const gameOverDiv = document.getElementById("game-over")
    const resultsDiv = document.getElementById("results")
    gameOverDiv.classList.remove("hidden");
    if ((newLobby.player1.overallScore + newLobby.player1.turnScore) >= 100) {
      resultsDiv.innerText = "Player 1 wins";
    } else {
      resultsDiv.innerText = "Player 2 wins";
    }
  }
}

function handleHold() {
  if (newLobby.player1.isTurn) {
    newLobby.addOverallScore();
    changeTurn();
  } else {
    newLobby.addOverallScore();
    changeTurn();
  }
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