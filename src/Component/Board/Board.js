import React, { useContext, useEffect } from 'react';
import Tile from '../Tile/Tile';
import { GameSettingContext } from '../../Context/GameSettingContext';
import './Board.css';
import ButtonSelection from '../ButtonsSelection/ButtonsSelection';
import nextMove from '../../minimaxAlgo';

export default React.memo(function Board() {
  const gameContext = useContext(GameSettingContext);

  useEffect(() => {
    if (gameContext.settingState.playerTwoSymbol) {
      const newGameState = {
        ...gameContext.gameState,
        playerTurn: gameContext.settingState.firstPlayer,
        gameStart: true,
      };
      gameContext.setGameState(newGameState);
    }
  }, [gameContext.settingState]);

  // Determine IA Move
  useEffect(() => {
    let firstMove = 0;
    if (
      gameContext.settingState.gameType === '1 player' &&
      gameContext.gameState.playerTurn === 1
    ) {
      if (gameContext.gameState.gameTurn === 1) {
        // if first : play on a random corner
        let corner = [0, 2, 6, 8]; // Index of all board corner
        firstMove = Math.floor(Math.random() * corner.length);
        console.log(firstMove);
        playOnBoard(corner[firstMove]);
        return;
      } else if (
        // if second : play on center if possible or a corner
        gameContext.gameState.gameTurn === 2
      ) {
        if (gameContext.gameState.board[4] === '-') {
          playOnBoard(4);
        } else {
          let corner = [0, 2, 6, 8]; // Index of all board corner
          let move = Math.floor(Math.random() * corner.length + 1);
          playOnBoard(corner[move]);
        }
        return;
      } else if (gameContext.gameState.gameTurn === 3) {
        // if third, play on the same line from turn 1
        if (firstMove === 0 || firstMove === 2) {
          // 0 or 2 = play on first line
          for (let i = 0; i < 3; i++) {
            if (gameContext.gameState.board[i] === '-') {
              playOnBoard(i);
            }
          }
        } else {
          for (let i = 6; i < 9; i++) {
            if (gameContext.gameState.board[i] === '-') {
              playOnBoard(i);
            }
          }
        }
      }
      let iaMove = nextMove(
        gameContext.gameState.board,
        gameContext.settingState.playerTwoSymbol,
        gameContext.settingState.playerOneSymbol
      );
      playOnBoard(iaMove);
    }
  }, [gameContext.settingState, gameContext.gameState.playerTurn]);

  const playOnBoard = (index) => {
    if (!gameContext.gameState.gameStart) {
      return;
    }
    const symbol =
      gameContext.gameState.playerTurn === 0
        ? gameContext.settingState.playerOneSymbol
        : gameContext.settingState.playerTwoSymbol;
    const newBoard = [...gameContext.gameState.board];
    newBoard[index] = symbol;
    const newPlayer = 1 - gameContext.gameState.playerTurn;
    const newTurn = 1 + gameContext.gameState.gameTurn;
    const NewGameState = {
      ...gameContext.gameState,
      board: newBoard,
      playerTurn: newPlayer,
      gameTurn: newTurn,
    };
    gameContext.setGameState(NewGameState);
  };

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
