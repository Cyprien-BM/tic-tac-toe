import React, { useContext } from 'react';
import Tile from '../Tile/Tile';
import { GameSettingContext } from '../../Context/GameSettingContext';
import './Board.css';
import ButtonSelection from '../ButtonsSelection/ButtonsSelection';

export default React.memo(function Board() {
  const gameContext = useContext(GameSettingContext);

  const playOnBoard = (index) => {
    console.log('ici');
    const symbol = gameContext.gameState.playerTurn === 1
      ? gameContext.settingState.playerTwoSymbol
      : gameContext.settingState.playerOneSymbol;
    const newBoard = [...gameContext.gameState.board];
    newBoard[index] = symbol;
    const newPlayer = 1 - gameContext.gameState.playerTurn;
    const NewGameState = {
      ...gameContext.gameState,
      board: newBoard,
      playerTurn: newPlayer,
    };
    gameContext.setGameState(NewGameState);
  };

  console.log(gameContext.gameState);

  return (
    <>
      <div>
        <ButtonSelection
          settings={gameContext.settingState}
          setSettings={gameContext.setSettingGameState}
        />
      </div>
      <table className='board'>
        <tbody>
          <tr id='first-row'>
            <Tile
              className={'tile left'}
              value={gameContext.gameState.board[0]}
              playOnBoard={playOnBoard}
              index={0}
            />
            <Tile
              className={'tile center'}
              value={gameContext.gameState.board[1]}
              playOnBoard={playOnBoard}
              index={1}
            />
            <Tile
              className={'tile right'}
              value={gameContext.gameState.board[2]}
              playOnBoard={playOnBoard}
              index={2}
            />
          </tr>
          <tr id='second-row'>
            <Tile
              className={'tile left'}
              value={gameContext.gameState.board[3]}
              playOnBoard={playOnBoard}
              index={3}
            />
            <Tile
              className={'tile center'}
              value={gameContext.gameState.board[4]}
              playOnBoard={playOnBoard}
              index={4}
            />
            <Tile
              className={'tile right'}
              value={gameContext.gameState.board[5]}
              playOnBoard={playOnBoard}
              index={5}
            />
          </tr>
          <tr id='third-row'>
            <Tile
              className={'tile left'}
              value={gameContext.gameState.board[6]}
              playOnBoard={playOnBoard}
              index={6}
            />
            <Tile
              className={'tile center'}
              value={gameContext.gameState.board[7]}
              playOnBoard={playOnBoard}
              index={7}
            />
            <Tile
              className={'tile right'}
              value={gameContext.gameState.board[8]}
              playOnBoard={playOnBoard}
              index={8}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
});
