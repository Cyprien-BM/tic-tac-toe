import './App.css';
import ButtonSelection from './Component/ButtonsSelection/ButtonsSelection';
import Board from './Component/Board/Board';
import GameContextProvider from './Context/GameContext';

function App() {

  console.log('app');

  
  return (
    <main>
      <GameContextProvider>
        <header>
          <h1>Tic Tac Bot</h1>
        </header>
        <div>
          <ButtonSelection/>
        </div>
        <Board/>
      </GameContextProvider>
    </main>
  );
}

export default App;
