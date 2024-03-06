function Lobby() {
  this.player1 = { currentScore: 0, isTurn: true };
  this.player2 = { currentScore: 0, isTurn: false };
}

Lobby.prototype.setTurn = function(player) {
  if (player === "player1") {
    this.player1.isTurn = true;
    this.player2.isTurn = false;
  } else if (player === "player2") {
    this.player1.isTurn = false;
    this.player2.isTurn = true;
  }
};