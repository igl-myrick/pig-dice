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
function rollDie() {
  let result = Math.floor(Math.random() * 6)
  return result + 1;
}