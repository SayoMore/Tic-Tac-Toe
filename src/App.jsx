import Player from "./Components/Player.jsx";
import { useState } from "react";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./Components/GameOver.jsx";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedPlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameturns, setGameTurns] = useState([]);
  const symbolX = derivedPlayer(gameturns);
  let gameBoardBase = [...intialGameBoard.map((array) => [...array])];
  let winner;

  for (const turn of gameturns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoardBase[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoardBase[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoardBase[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoardBase[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = playerName[firstSquareSymbol];
    }
  }

  let hasDraw = gameturns.length === 9 && !winner;

  const handleActivePayer = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedPlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handleNameChange = (symbol, newName) => {
    setPlayerName((prevName) => {
      return { ...prevName, [symbol]: newName };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            activePlayerSymbol={symbolX === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            name="Player 2"
            symbol="O"
            activePlayerSymbol={symbolX === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard activePlayer={handleActivePayer} board={gameBoardBase} />
      </div>
      <Log turns={gameturns} />
    </main>
  );
}

export default App;
