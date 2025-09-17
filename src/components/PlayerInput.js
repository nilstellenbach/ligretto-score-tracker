import React, { useState } from "react";

export default function PlayerInput({ onStart }) {
  const [names, setNames] = useState(["", ""]);

  const handleNameChange = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const addPlayer = () => {
    if (names.length < 12) {
      setNames([...names, ""]);
    }
  };

  const removePlayer = (index) => {
    if (names.length > 2) {
      setNames(names.filter((_, i) => i !== index));
    }
  };

  const canStart = names.filter((n) => n.trim() !== "").length >= 2;

return (
  <div>
    <h2>Spieler eingeben (min. 2, max. 12)</h2>
    {names.map((name, i) => (
      <div key={i} className="label-row">
        <input
          type="text"
          value={name}
          placeholder={`Spieler ${i + 1}`}
          onChange={(e) => handleNameChange(i, e.target.value)}
        />
        {names.length > 2 && (
          <button onClick={() => removePlayer(i)} aria-label="Spieler entfernen">✖</button>
        )}
      </div>
    ))}

    <button onClick={addPlayer} disabled={names.length >= 12}>Spieler hinzufügen</button>
    <button
      onClick={() => onStart(names)}
      disabled={!canStart}
      style={{ marginTop: 20, fontWeight: "bold" }}
    >
      Spiel starten
    </button>
  </div>
);

}
