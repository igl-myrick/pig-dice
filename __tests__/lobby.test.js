import Lobby from './../src/lobby.js'

describe('Lobby', () => {
  
  test('should correctly create a lobby object with two player objects containing an overallScore and turnScore', () => {
    const newLobby = new Lobby()
    expect(newLobby.player1.overallScore).toEqual(0)
    expect(newLobby.player1.turnScore).toEqual(0)
    expect(newLobby.player2.overallScore).toEqual(0)
    expect(newLobby.player2.turnScore).toEqual(0)
  });
});

// ## Tests

// Describe: Lobby

// Test: It should create a Lobby object that contains two player objects with a overallScore number value, a turnScore value, and an isTurn boolean value.
// Code: let newLobby = new Lobby();
// Expect: newLobby = { player1: { overallScore: 0, isTurn: true }, player2: { overallScore: 0, turnScore: 0, isTurn: false } }

// Describe: Lobby.prototype.setTurn

// Test: It should set the isTurn value of a player to true depending on the method's parameter input, while setting the opposite player's value to false.
// Code: 
// let newLobby = new Lobby();
// newLobby.setTurn("player2");
// Expect: newLobby = { player1: { overallScore: 0, turnScore: 0, isTurn: false }, player2: { overallScore: 0, turnScore: 0, isTurn: true } }

// Describe: rollDie

// Test: It should return a random number between 1 and 6.
// Code: rollDie();
// Expect: 5