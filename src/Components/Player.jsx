import { useState } from "react";

const Player = ({ name, symbol, activePlayerSymbol, onNameChange }) => {
  const [isEditing, setisEditing] = useState(false);
  const [playerName, setplayerName] = useState(name);

  let player = <span className="player-name"> {playerName} </span>;
  let edit = "Edit";

  const toEdit = () => {
    isEditing ? setisEditing(false) : setisEditing(true);

    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  };

  const handleonChange = (e) => {
    setplayerName(e.target.value);
  };

  if (isEditing) {
    player = (
      <input
        type="text"
        className="player-name"
        required
        value={playerName}
        onChange={handleonChange}
      />
    );
    edit = "Save";
  }
  return (
    <li className={activePlayerSymbol ? "active" : undefined}>
      <span className="player">
        {player}
        <span className="player-symbol"> {symbol} </span>
      </span>
      <button onClick={toEdit}>{edit}</button>
    </li>
  );
};

export default Player;
