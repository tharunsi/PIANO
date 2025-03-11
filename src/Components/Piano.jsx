import React, { useState, useEffect } from "react";
import Key from "./Key";
import "./Piano.css";
import { NOTES, VALID_KEYS, KEY_TO_NOTE } from "../global/constants";

const Piano = () => {
  const [pressedKeys, setPressedKeys] = useState([]);

  const playNote = (note) => {
    if (note) {
      const noteAudio = document.getElementById(note);
      if (noteAudio && noteAudio.canPlayType("audio/mpeg")) {
        noteAudio.currentTime = 0;
        noteAudio.play().catch((error) => console.error("Audio play failed:", error));
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.repeat) return; // Ignore repeated keydown events
    const key = event.key;
    if (VALID_KEYS.includes(key) && !pressedKeys.includes(key)) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
      playNote(KEY_TO_NOTE[key]);
    }
  };

  const handleKeyUp = (event) => {
    setPressedKeys((prevKeys) => prevKeys.filter((k) => k !== event.key));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  return (
    <div>
      <div className="piano">
        {NOTES.map((note, index) => (
          <Key key={index} note={note} pressedKeys={pressedKeys} playNote={playNote} />
        ))}
      </div>

      {/* Preload all audio files */}
      <div>
        {NOTES.map((note, index) => (
          <audio key={index} id={note} src={`/Notes/${note}.mp3`} />
        ))}
      </div>
    </div>
  );
};

export default Piano;
