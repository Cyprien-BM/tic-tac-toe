import './App.css';

import Board from './Component/Board/Board';
import GameSettingContextProvider from './Context/GameSettingContext';

function App() {
  console.log('app');

  return (
    <main>
      <header>
        <h1>Tic Tac Bot</h1>
      </header>
      <GameSettingContextProvider>
        <Board />
      </GameSettingContextProvider>
    </main>
  );
}

export default App;
