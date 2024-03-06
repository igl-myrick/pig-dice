Describe: Lobby

Test: It should create a Lobby object that contains two player objects with a currentScore number value and an isTurn boolean value.
Code: let newLobby = new Lobby();
Expect: newLobby = { player1: { currentScore: 0, isTurn: true }, player2: { currentScore: 0, isTurn: false } }