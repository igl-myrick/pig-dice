Describe: Lobby

Test: It should create a Lobby object that contains two player objects with a currentScore number value and an isTurn boolean value.
Code: let newLobby = new Lobby();
Expect: newLobby = { player1: { currentScore: 0, isTurn: true }, player2: { currentScore: 0, isTurn: false } }

Describe: Lobby.prototype.setTurn

Test: It should set the isTurn value of a player to true depending on the method's parameter input, while setting the opposite player's value to false.
Code: 
let newLobby = new Lobby();
newLobby.setTurn("player2");
Expect: newLobby = { player1: { currentScore: 0, isTurn: false }, player2: { currentScore: 0, isTurn: true } }

Describe: Lobby.prototype.updateScore

Test: It should add to a player's currentScore value.
Code:
let newLobby = new Lobby();
newLobby.updateScore("player2", 6)
Expect: newLobby = { player1: { currentScore: 0, isTurn: false }, player2: { currentScore: 6, isTurn: true } }