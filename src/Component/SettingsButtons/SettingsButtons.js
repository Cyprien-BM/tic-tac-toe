import React, { useState, useRef, memo, useEffect } from 'react';
import './SettingsButtons.css';

export default memo(function Button(props) {
  const buttonOne = useRef();
  const buttonTwo = useRef();

  const initialButtonState = {
    btnOne: '1 joueur', // btOne = 1 player and then X symbol
    btnTwo: '2 joueur', // btOne = 2 player and then O symbol
    btnsNames: 'players', // players or symbols selection
  };

  const [btnState, setBtnState] = useState(initialButtonState);

  const gameParameterSelection = (event) => {
    if (event.target.name === 'players') {
      determineGameType(event);
    } else {
      determineSymbols(event);
    }
  };

  const determineGameType = (event) => {
    const newSettingState = { ...props.settings };
    if (event.target.id === 'bntOne') {
      const firstPlayer = randomNumber(); //0 is user, 1 is IA
      props.setSettings(
        modifyGameType(newSettingState, '1 player', firstPlayer)
      );
    } else {
      props.setSettings(modifyGameType(newSettingState, '2 player', 0));
    }
    switchButtonsToSymbol();
  };

  // If first player is IA, choose random symbols for both player
  useEffect(() => {
    if (props.settings.firstPlayer === 1) {
      determineRandomSymbols();
    }
  }, [props.settings.firstPlayer]);

  const determineSymbols = (event) => {
    const newSettingState = { ...props.settings };
    if (event.target.id === 'bntOne') {
      props.setSettings(modifyGameSymbols(newSettingState, 'X', 'O'));
    } else {
      props.setSettings(modifyGameSymbols(newSettingState, 'O', 'X'));
    }
    hideButtons();
  };

  const determineRandomSymbols = () => {
    const newSettingState = { ...props.settings };
    const playerOneSymbol = randomNumber(); //0 X, 1 O
    if (playerOneSymbol === 0) {
      props.setSettings(modifyGameSymbols(newSettingState, 'X', 'O'));
    } else {
      props.setSettings(modifyGameSymbols(newSettingState, 'O', 'X'));
    }
    hideButtons();
  };

  const modifyGameType = (newSettingState, value, firstPlayer) => {
    newSettingState.gameType = value;
    newSettingState.firstPlayer = firstPlayer;
    return newSettingState;
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 2);
  };

  const modifyGameSymbols = (newSettingState, firstSymbol, secondSymbol) => {
    newSettingState.playerOneSymbol = firstSymbol;
    newSettingState.playerTwoSymbol = secondSymbol;
    return newSettingState;
  };

  const switchButtonsToSymbol = () => {
    const newBtnState = {
      ...btnState,
      btnOne: 'X',
      btnTwo: 'O',
      btnsNames: 'symbols',
    };
    setBtnState(newBtnState);
  };

  const hideButtons = () => {
    buttonOne.current.className = 'hidden';
    buttonTwo.current.className = 'hidden';
  };

  return (
    <>
      <button
        ref={buttonOne}
        id='bntOne'
        name={btnState.btnsNames}
        onClick={gameParameterSelection}
        className=''
      >
        {btnState.btnOne}
      </button>
      <button
        ref={buttonTwo}
        id='btnTwo'
        name={btnState.btnsNames}
        onClick={gameParameterSelection}
        className=''
      >
        {btnState.btnTwo}
      </button>
    </>
  );
});
