import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import { GameContext } from '../../Context/GameContext';
import './Board.css';

export default React.memo(function Board() {
  const gameContext = useContext(GameContext);

  console.log('board');

  return (
    <table className='board'>
      <tbody>
        <tr id="first-row">
          <Tile
            className={'tile left'}
            value={gameContext.gameState.board[0]}
          />
          <Tile
            className={'tile center'}
            value={gameContext.gameState.board[1]}
          />
          <Tile
            className={'tile right'}
            value={gameContext.gameState.board[2]}
          />
        </tr>
        <tr id="second-row">
          <Tile
            className={'tile left'}
            value={gameContext.gameState.board[3]}
          />
          <Tile
            className={'tile center'}
            value={gameContext.gameState.board[4]}
          />
          <Tile
            className={'tile right'}
            value={gameContext.gameState.board[5]}
          />
        </tr>
        <tr id="third-row">
          <Tile
            className={'tile left'}
            value={gameContext.gameState.board[6]}
          />
          <Tile
            className={'tile center'}
            value={gameContext.gameState.board[7]}
          />
          <Tile
            className={'tile right'}
            value={gameContext.gameState.board[8]}
          />
        </tr>
      </tbody>
    </table>
  );
})
