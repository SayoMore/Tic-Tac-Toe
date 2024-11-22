const GameBoard = ({ activePlayer, board }) => {
  return (
    <ol id="game-board">
      {board.map((rowVal, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {rowVal.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled={playerSymbol !== null}
                  onClick={() => activePlayer(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
