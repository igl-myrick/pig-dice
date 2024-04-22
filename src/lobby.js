export default function Lobby() {
  this.player1 = { overallScore: 0, turnScore: 0 };
  this.player2 = { overallScore: 0, turnScore: 0 };
  this.currentPlayer = "player1";
  this.playerHasWon = false;
  this.gameWinner = "";
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
  this[this.currentPlayer].turnScore += numToAdd;
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

Lobby.prototype.determineWinner = function() {
  const player1Win = this.player1.overallScore + this.player1.turnScore >= 100;
  const player2Win = this.player2.overallScore + this.player2.turnScore >= 100;
  if (player1Win || player2Win) {
    this.playerHasWon = true;
    this.gameWinner = this.currentPlayer;
  }
}