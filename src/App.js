import './App.css';
import ButtonSection from './Component/ButtonsSection/ButtonSection';
import Board from './Component/Board/Board';
import GameContextProvider from './Context/GameContext';

function App() {

  
  return (
    <main>
      <GameContextProvider>
        <header>
          <h1>Tic Tac Bot</h1>
        </header>
        <div>
          <ButtonSection/>
        </div>
        <Board/>
      </GameContextProvider>
    </main>
  );
}

export default App;
