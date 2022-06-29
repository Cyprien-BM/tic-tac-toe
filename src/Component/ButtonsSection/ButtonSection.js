import React, {useState, useContext} from 'react';
import { GameContext } from '../../Context/GameContext';

export default function Button() {

  const gameContext = useContext(GameContext);

  console.log(gameContext);

  const initialButtonState = {
    btnOne: '1 joueur',
    btnTwo: '2 joueur',
  };

  const [btnState, setBtnState] = useState(initialButtonState);

  return (
    <>
      <button>{btnState.btnOne}</button>
      <button>{btnState.btnTwo}</button>
    </>
  );
}
