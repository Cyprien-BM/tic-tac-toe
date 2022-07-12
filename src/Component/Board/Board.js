import React, { useContext, useEffect, useState, useMemo, useRef } from 'react';
import Tile from '../Tile/Tile';
import './Board.css';
import nextMove from '../../minimaxAlgo';
import checkVictoryCondition from '../../checkVictory';
import { useCallback } from 'react';

export default function Board(props) {

const ref = useRef()

  useEffect(() => {
    if (props.settingState.playerTwoSymbol) {
      console.log('ici');
      const newGameState = {
        ...props.gameState,
        playerTurn: props.settingState.firstPlayer,
        gameStarted: true,
      };
      props.setGameState(newGameState);
    }
  }, [props.settingState]);

  console.log('board rerender');
  console.log(props.gameState);
  console.log(props.settingState);

  // Determine IA Move
  let corner = [0, 2, 6, 8]; // Index of all board corner
  useEffect(() => {
    if (
      checkVictoryCondition(props.gameState.board) ||
      props.gameState.gameTurn === 10
    ) {
      return;
    }
    if (
      props.settingState.gameType === '1 player' &&
      props.gameState.playerTurn === 1
    ) {
      if (props.gameState.gameTurn === 1) {
        // if first : play on a random corner
        playOnBoard(corner[Math.floor(Math.random() * corner.length)]);
        return;
      } else if (
        // if second : play on center if possible, else on a corner
        props.gameState.gameTurn === 2
      ) {
        if (props.gameState.board[4] === '-') {
          playOnBoard(4);
        } else {
          playOnBoard(corner[Math.floor(Math.random() * corner.length)]);
        }
        return;
      } else if (props.gameState.gameTurn === 3) {
        let firstMoveIndex = props.gameState.board.findIndex(
          (value) => value === props.settingState.playerTwoSymbol
        );
        if (firstMoveIndex === 0 || firstMoveIndex === 2) {
          // 0 or 2 = play on first line
          for (let i = 0; i < 3; i++) {
            if (props.gameState.board[i] === '-') {
              playOnBoard(i);
              return;
            }
          }
        } else {
          for (let i = 6; i < 9; i++) {
            if (props.gameState.board[i] === '-') {
              playOnBoard(i);
              return;
            }
          }
        }
      }
      let iaMove = nextMove(
        props.gameState.board,
        props.settingState.playerTwoSymbol,
        props.settingState.playerOneSymbol
      );
      playOnBoard(iaMove);
    }
  }, [props.settingState, props.gameState.playerTurn]);

  const trackIaFirstMove = (firsMove) => {
    const newGameState = { ...props.gameState, iaFirstMove: firsMove };
    props.setGameState(newGameState);
  };

  const playOnBoard = (index) => {
    console.log('hello');
    console.log(props.gameState);
    console.log(props.settingState);
    if (
      checkVictoryCondition(props.gameState.board) ||
      props.gameState.gameTurn === 11
    ) {
      return;
    }
    const symbol =
      props.gameState.playerTurn === 0
        ? props.settingState.playerOneSymbol
        : props.settingState.playerTwoSymbol;
    const newBoard = [...props.gameState.board];
    newBoard[index] = symbol;
    const newPlayer = 1 - props.gameState.playerTurn;
    const newTurn = 1 + props.gameState.gameTurn;
    const NewGameState = {
      ...props.gameState,
      board: newBoard,
      playerTurn: newPlayer,
      gameTurn: newTurn,
    };
    props.setGameState(NewGameState);
  };

  const handleClickOnTile = (index) => {
    console.log('click');
    playOnBoard(index);
  };

  console.log(ref);

  return (
    <>
      <div>
        <p>
          {props.settingState.gameType === '1 player'
            ? 'Joueur 1 VS IA'
            : props.settingState.gameType === '2 player' &&
              'Joueur 1 VS Joueur 2'}
        </p>
        <p>
          {props.settingState.firstPlayer === 0
            ? 'Joueur 1 commence et joue ' + props.settingState.playerOneSymbol
            : props.settingState.firstPlayer === 1
            ? 'IA commence et joue ' + props.settingState.playerTwoSymbol
            : ''}
        </p>
      </div>
      <table className='board'>
        <tbody>
          <tr id='first-row'>
            <Tile
            ref={ref}
              className={'tile left'}
              value={props.gameState.board[0]}
              playOnBoard={playOnBoard}
              index={0}
            />
            <Tile
              className={'tile center'}
              value={props.gameState.board[1]}
              playOnBoard={playOnBoard}
              index={1}
            />
            <Tile
              className={'tile right'}
              value={props.gameState.board[2]}
              playOnBoard={playOnBoard}
              index={2}
            />
          </tr>
          <tr id='second-row'>
            <Tile
              className={'tile left'}
              value={props.gameState.board[3]}
              playOnBoard={playOnBoard}
              index={3}
            />
            <Tile
              className={'tile center'}
              value={props.gameState.board[4]}
              playOnBoard={playOnBoard}
              index={4}
            />
            <Tile
              className={'tile right'}
              value={props.gameState.board[5]}
              playOnBoard={playOnBoard}
              index={5}
            />
          </tr>
          <tr id='third-row'>
            <Tile
              className={'tile left'}
              value={props.gameState.board[6]}
              playOnBoard={playOnBoard}
              index={6}
            />
            <Tile
              className={'tile center'}
              value={props.gameState.board[7]}
              playOnBoard={playOnBoard}
              index={7}
            />
            <Tile
              className={'tile right'}
              value={props.gameState.board[8]}
              playOnBoard={playOnBoard}
              index={8}
            />
          </tr>
        </tbody>
      </table>
    </>
  );
}
