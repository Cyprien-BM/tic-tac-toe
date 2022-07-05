import React, { useState, createContext, useEffect } from 'react';

export const GameSettingContext = createContext();

const GameSettingContextProvider = (props) => {
  const [gameState, setGameState] = useState({
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'], // Top row is board[0] to board[2], left to right, Middle row is board[3] to board[5] and Bottom row is board[6] to board[8]
    playerTurn: '', // Wich player is playing : 0 is player one / 1 is player two
  });

  const [settingState, setSettingGameState] = useState({
    gameType: '', // 1 player or 2 player
    playerOneSymbol: '', // X or O
    playerTwoSymbol: '', // X or O
  });

  useEffect(() => {
    if (settingState.gameType === '2 player') {
      const newGameState = {...gameState, playerTurn: 0}
      setGameState(newGameState)
    }
  }, [settingState.gameType])

  return (
    <GameSettingContext.Provider
      value={{ gameState, setGameState, settingState, setSettingGameState }}
    >
      {props.children}
    </GameSettingContext.Provider>
  );
};

export default GameSettingContextProvider;
