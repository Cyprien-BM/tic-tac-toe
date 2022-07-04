import React, { useState, createContext } from 'react';

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [gameState, setGameState] = useState({
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'], // Top row is board[0] to board[2], left to right, Middle row is board[3] to board[5] and Bottom row is board[6] to board[8]
    gameType: '', // 1 player or 2 player
    playerOneTurn: '', // 0 is first, 1 is second
    playerOneSymbol: '', // X or O
    playerTwoTurn: '', // 0 is first, 1 is second
    playerTwoSymbol: '', // X or O
    playerTurn: '', // Wich player is playing
  });

  // const playOnBoard = (symbol, index) => {
  //   const newBoard = [...gameState.board];
  //   newBoard[index] = symbol;
  //   const newPlayer = 1 - gameState.playerTurn
  //   const NewGameState = { ...gameState, board: newBoard, playerTurn: newPlayer };
  //   setGameState(NewGameState);
  // };

  console.log('context');

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
