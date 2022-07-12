import { useState } from 'react';
import './App.css';
import Board from './Component/Board/Board';
import SettingsButtons from './Component/SettingsButtons/SettingsButtons';

function App() {
  const originalGameState = {
    board: ['-', '-', '-', '-', '-', '-', '-', '-', '-'], // Top row is board[0] to board[2], left to right, Middle row is board[3] to board[5] and Bottom row is board[6] to board[8]
    playerTurn: '', // Wich player is playing : 0 is player one / 1 is player two or IA
    gameStarted: false,
    gameTurn: 1,
  };

  const originalSettingState = {
    gameType: '', // 1 player or 2 player
    firstPlayer: undefined,
    playerOneSymbol: '', // X or O
    playerTwoSymbol: '', // X or O  - Player Two is also IA
  };

  const [gameState, setGameState] = useState(originalGameState);

  const [settingState, setSettingState] = useState(originalSettingState);

  const reinitializeStates = () => {
    const newGameState = { ...originalGameState };
    const newSettingState = { ...originalSettingState };
    setGameState(newGameState);
    setSettingState(newSettingState);
  };

  return (
    <main>
      <header>
        <h1>Tic Tac Bot</h1>
      </header>
      <main>
        <SettingsButtons
          settings={settingState}
          setSettings={setSettingState}
        />
        <Board
          gameState={gameState}
          settingState={settingState}
          setGameState={setGameState}
        />
      </main>
    </main>
  );
}

export default App;