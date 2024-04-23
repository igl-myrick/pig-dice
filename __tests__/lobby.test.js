import Lobby from './../src/lobby.js'

describe('Lobby', () => {
  
  test('should correctly create a lobby object with two player objects containing an overallScore and turnScore', () => {
    const newLobby = new Lobby();
    expect(newLobby.player1.overallScore).toEqual(0);
    expect(newLobby.player1.turnScore).toEqual(0);
    expect(newLobby.player2.overallScore).toEqual(0);
    expect(newLobby.player2.turnScore).toEqual(0);
  });

  test('should correctly create a lobby object including currentPlayer & gameWinner values and a playerHasWon boolean', () => {
    const newLobby = new Lobby();
    expect(newLobby.player1.overallScore).toEqual(0);
    expect(newLobby.player1.turnScore).toEqual(0);
    expect(newLobby.player2.overallScore).toEqual(0);
    expect(newLobby.player2.turnScore).toEqual(0);
    expect(newLobby.currentPlayer).toEqual("player1");
    expect(newLobby.playerHasWon).toEqual(false);
    expect(newLobby.gameWinner).toEqual("");
  });
});

describe('Lobby.prototype.setTurn', () => {

  test('should correctly change the current player value of the lobby', () => {
    const newLobby = new Lobby();
    newLobby.setTurn("player2");
    expect(newLobby.currentPlayer).toEqual("player2");
  });
});

describe('Lobby.prototype.addOverallScore', () => {

  test('should correctly add to the overallScore value of the current player', () => {
    const newLobby = new Lobby();
    newLobby.player1.turnScore = 6;
    newLobby.addOverallScore();
    expect(newLobby.player1.overallScore).toEqual(6);
  });
});