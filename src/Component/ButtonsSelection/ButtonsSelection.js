import React, {useState, useContext, useRef} from 'react';
import { GameContext } from '../../Context/GameContext';

export default function Button() {

  const context = useContext(GameContext);

  const buttonOne = useRef()
  const buttonTwo = useRef()

  const initialButtonState = {
    btnOne: '1 joueur',     // btOne = 1 player and then X symbol
    btnTwo: '2 joueur',     // btOne = 2 player and then O symbol
    btnsNames: 'players'     // players or symbols selection
  };

  console.log('hello');

  const [btnState, setBtnState] = useState(initialButtonState);

  const gameParameterSelection = (event) => {
    const newGameState = {...context.gameState}
    if (event.target.name === 'players') {
      if (event.target.id === 'bntOne') {
        context.setGameState(modifyGameType(newGameState, '1 player'))
      } else {
        context.setGameState(modifyGameType(newGameState, '2 player'))
      }
      switchButtonsToSymbol()
    } else {
      if (event.target.id === 'bntOne') {
        context.setGameState(modifyGameSymbols(newGameState, 'X', 'O'))
      } else {
        context.setGameState(modifyGameSymbols(newGameState, 'O', 'X'))
      }
      hideButtons()
    }
  }

  const modifyGameType = (newGameState, value) => {
    newGameState.gameType = value
    return newGameState
  }

  const modifyGameSymbols = (newGameState, firstSymbol, secondSymbol) => {
    newGameState.playerOneSymbol = firstSymbol;
    newGameState.playerTwoSymbol = secondSymbol;
    return newGameState
  }

  const switchButtonsToSymbol = () => {
    const newBtnState = {...btnState, btnOne: 'X', btnTwo: 'O', btnsNames: 'symbols'}
    setBtnState(newBtnState)
  }

  const hideButtons = () => {
    console.log(('ici'));
    buttonOne.className = 'hidden'
    buttonTwo.className = 'hidden'
  }

  return (
    <>
      <button ref={buttonOne} id='bntOne' name={btnState.btnsNames} onClick={gameParameterSelection} className=''>{btnState.btnOne}</button>
      <button ref={buttonTwo} id='btnTwo' name={btnState.btnsNames} onClick={gameParameterSelection} className=''>{btnState.btnTwo}</button>
    </>
  );
}
