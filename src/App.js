import './App.css';
import Button from './Component/Button';
import Board from './Component/Board/Board';
import GameContextProvider from './Context/GameContext';

function App() {

  return (
    <main>
      <GameContextProvider >
      <div>
        <Button/>
        <Button/>
        <Board />
      </div>
      </GameContextProvider>
    </main>
  )
}

export default App;
