import Lobby from './lobby.js';

let newLobby = new Lobby();

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
  let playerHistoryID = (newLobby.currentPlayer === "player1") ? "player-1-history" : "player-2-history";
  let playerScoreID = (newLobby.currentPlayer === "player1") ? "player-1-score" : "player-2-score";
  document.getElementById(playerHistoryID).innerText = turnResult;
  if (turnResult === 1) {
    document.getElementById(playerScoreID).innerText = newLobby[newLobby.currentPlayer].overallScore;
    changeTurn();
  } else {
    document.getElementById(playerScoreID).innerText = newLobby[newLobby.currentPlayer].overallScore + newLobby[newLobby.currentPlayer].turnScore;
  }
  newLobby.determineWinner();
  if (newLobby.playerHasWon) {
    const player1Button = document.getElementById("player-1-buttons");
    const player2Button = document.getElementById("player-2-buttons");
    player1Button.classList.add("hidden");
    player2Button.classList.add("hidden");
    const gameOverDiv = document.getElementById("game-over");
    const resultsDiv = document.getElementById("results");
    gameOverDiv.classList.remove("hidden");
    resultsDiv.innerText = "Player " + ((newLobby.gameWinner === "player1") ? "1" : "2") + " wins";
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