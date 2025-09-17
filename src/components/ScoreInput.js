import React, { useState } from "react";

export default function ScoreInput({ players, round, onSubmit }) {
  const [roundScores, setRoundScores] = useState(
    players.reduce((acc, p) => {
      acc[p] = "";
      return acc;
    }, {})
  );

  const handleChange = (player, value) => {
    if (/^-?\d*$/.test(value)) {
      setRoundScores((prev) => ({ ...prev, [player]: value }));
    }
  };

  const canSubmit = players.every((p) => roundScores[p] !== "");

  const submitScores = () => {
    if (canSubmit) {
      onSubmit(roundScores);
      setRoundScores(players.reduce((acc, p) => ({ ...acc, [p]: "" }), {}));
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Runde {round} - Punkte eingeben</h2>
      {players.map((p) => (
  <div key={p} style={{ marginBottom: 10 }}>
    <label>
      {p}:{" "}
      <input
        type="text"
        value={roundScores[p]}
        onChange={(e) => handleChange(p, e.target.value)}
        placeholder="z.B. 5 oder -3"
      />
    </label>
  </div>
))}
<button onClick={submitScores} disabled={!canSubmit}>
  Punkte speichern
</button>

    </div>
  );
}
