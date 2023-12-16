
import PlayerDetail from "./assets/components/PlayerDetail"
import GameBoard from "./assets/components/GameBoard"
import { useState } from "react";
import Log from "./assets/components/Log";
import { WINNING_COMBINATIONS } from './winning-conditions';
import GameOver from "./assets/components/GameOver";


const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = currentSymbol(gameTurns);
  const [playersName, setPlayersName] = useState(PLAYERS);


  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  function currentSymbol(gameTurns) {
    let activePlayer = 'X';
    activePlayer = gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
    return activePlayer;
  }

  let winner;

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurn) => {
      const activePlayer = currentSymbol(prevTurn)
      const updatedTurn = [
        {
          square: {
            row: rowIndex, col: colIndex
          },
          player: activePlayer
        }, ...prevTurn
      ];
      return updatedTurn;
    });
  }

  function gameReset() {
    setGameTurns([]);
  }

  function handlePlayersName(symbol, newName) {
    setPlayersName(prevPlayername => {
      return {
        ...prevPlayername,
        [symbol]: newName
      }
    });

  }


  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playersName[firstSquareSymbol];
      console.log(playersName)
    }


  }




  return (
    <main>
      <div id="game-container">

        {(winner || hasDraw) && <GameOver winner={winner} resetGame={gameReset} />}
        <ol id="players" className="highlight-player">
          <PlayerDetail nameEditable={'Player 1'} isActive={activePlayer === PLAYERS.X} symbol={'X'} onSave={handlePlayersName} />
          <PlayerDetail nameEditable={'Player 2'} isActive={activePlayer === PLAYERS.O} symbol={'O'} onSave={handlePlayersName} />
        </ol>
        <GameBoard togglePlayer={handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}
export default App
