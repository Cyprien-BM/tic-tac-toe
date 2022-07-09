import React, { useState, createContext } from 'react';

export const GameSettingContext = createContext();

const GameSettingContextProvider = (props) => {
  const [gameState, setGameState] = useState({
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'], // Top row is board[0] to board[2], left to right, Middle row is board[3] to board[5] and Bottom row is board[6] to board[8]
    playerTurn: '', // Wich player is playing : 0 is player one / 1 is player two or IA
    gameStart: false,
    gameTurn: 1
  });

  const [settingState, setSettingGameState] = useState({
    gameType: '', // 1 player or 2 player
    firstPlayer: 0,
    playerOneSymbol: '', // X or O
    playerTwoSymbol: '', // X or O  - Player Two is also IA
  });

  return (
    <GameSettingContext.Provider
      value={{ gameState, setGameState, settingState, setSettingGameState }}
    >
      {props.children}
    </GameSettingContext.Provider>
  );
};

export default GameSettingContextProvider;
