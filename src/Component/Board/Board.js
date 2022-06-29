import React, { useContext } from 'react'
import Tile from '../Tile/Tile'
import {GameContext} from '../../Context/GameContext'

export default function Board() {

  const gameContext = useContext(GameContext);

  return (
    <table>
      <tbody>
        <tr>
          <Tile value={gameContext.gameState.board[0]}/>
          <Tile value={gameContext.gameState.board[1]}/>
          <Tile value={gameContext.gameState.board[2]}/>
        </tr>
        <tr>
          <Tile value={gameContext.gameState.board[3]}/>
          <Tile value={gameContext.gameState.board[4]}/>
          <Tile value={gameContext.gameState.board[5]}/>
        </tr>
        <tr>
          <Tile value={gameContext.gameState.board[6]}/>
          <Tile value={gameContext.gameState.board[7]}/>
          <Tile value={gameContext.gameState.board[8]}/>
        </tr>
      </tbody>
    </table>
  )
}
