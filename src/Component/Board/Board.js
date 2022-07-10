import React, { useContext, useEffect, useState } from 'react';
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
        gameStarted: true,
      };
      gameContext.setGameState(newGameState);
    }
  }, [gameContext.settingState]);

  // Determine IA Move
  let corner = [0, 2, 6, 8]; // Index of all board corner
  useEffect(() => {
    if (
      gameContext.settingState.gameType === '1 player' &&
      gameContext.gameState.playerTurn === 1
    ) {
      if (gameContext.gameState.gameTurn === 1) {
        // if first : play on a random corner
        playOnBoard(corner[Math.floor(Math.random() * corner.length)]);
        return;
      } else if (
        // if second : play on center if possible, else on a corner
        gameContext.gameState.gameTurn === 2
      ) {
        if (gameContext.gameState.board[4] === '-') {
          playOnBoard(4);
        } else {
          playOnBoard(corner[Math.floor(Math.random() * corner.length)]);
        }
        return;
      } else if (gameContext.gameState.gameTurn === 3) {
        let firstMoveIndex = gameContext.gameState.board.findIndex(
          (value) => value === gameContext.settingState.playerTwoSymbol
        );
        if (firstMoveIndex === 0 || firstMoveIndex === 2) {
          // 0 or 2 = play on first line
          for (let i = 0; i < 3; i++) {
            if (gameContext.gameState.board[i] === '-') {
              console.log(i);
              playOnBoard(i);
              return;
            }
          }
        } else {
          console.log('là');
          for (let i = 6; i < 9; i++) {
            if (gameContext.gameState.board[i] === '-') {
              console.log(i);
              playOnBoard(i);
              return;
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

  const trackIaFirstMove = (firsMove) => {
    const newGameState = { ...gameContext.gameState, iaFirstMove: firsMove };
    console.log('ici');
    console.log(newGameState);
    gameContext.setGameState(newGameState);
  };

  const playOnBoard = (index) => {
    console.log('là');
    if (!gameContext.gameState.gameStarted) {
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
      <div>
        <p>
          {gameContext.settingState.gameType === '1 player' ? 'Joueur 1 VS IA' : gameContext.settingState.gameType === '2 player' && 'Joueur 1 VS Joueur 2'}
        </p>
        <p>
          {gameContext.settingState.firstPlayer === 0
            ? 'Joueur 1 commence et joue ' + gameContext.settingState.playerOneSymbol
            : gameContext.settingState.firstPlayer === 1
            ? 'IA commence et joue ' + gameContext.settingState.playerTwoSymbol
            : ''}
        </p>
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
