import React from "react";
import "./Key.css";
import { NOTE_TO_KEY } from "../global/constants";

const Key = ({ note, pressedKeys }) => {
  const noteIsFlat = note.length > 1;
  const keyIsPressed = pressedKeys.includes(NOTE_TO_KEY[note]);

  let keyClassName = "key";
  if (noteIsFlat) keyClassName += " flat";
  if (keyIsPressed) keyClassName += " pressed";

  return (
    <div className={keyClassName}>
      {!noteIsFlat && <div className="key-text">{note.toUpperCase()}</div>}
    </div>
  );
};

export default Key;
