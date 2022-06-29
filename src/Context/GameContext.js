import React, {useState, createContext} from "react";

export const GameContext = createContext();

const GameContextProvider = props => {
  
  const[gameState, setGameState] = useState({
    board: ['-', '-', '-','-', '-', '-','-', '-', '-'],
    firstPlayerSymbol: '',
    secondPlayerSymbol: '',
  })

  const playOnBoard = (symbol, index) => {
    const newBoard = [...gameState.board];  
    newBoard[index] = symbol;
    const NewGameState = {...gameState, noard: newBoard}
    setGameState(NewGameState)
  }

  return (
    <GameContext.Provider value={{gameState, playOnBoard}}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider