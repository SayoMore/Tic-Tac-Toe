import React from "react";

const GameOver = ({ winner, onRestart }) => {
  return (
    <div id="game-over">
      <h2>GameOver</h2>
      {winner && <p>{winner} WON! </p>}
      {!winner && <p>It is a draw </p>}
      <p>
        <button onClick={onRestart}> Rematch! </button>
      </p>
    </div>
  );
};

export default GameOver;
