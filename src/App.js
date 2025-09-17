import React, { useState } from "react";
import PlayerInput from "./components/PlayerInput";
import ScoreInput from "./components/ScoreInput";
import Scoreboard from "./components/Scoreboard";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]); // [{round: 1, scores: {player1: 5, player2: -2, ...}}]
  const [round, setRound] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);

  const addPlayers = (names) => {
    const trimmedNames = names.filter((n) => n.trim() !== "");
    setPlayers(trimmedNames);
    setGameStarted(true);
  };

  const addScores = (roundScores) => {
    setScores((prev) => [...prev, { round, scores: roundScores }]);
    setRound((prev) => prev + 1);
  };

  const calculateTotals = () => {
    const totals = {};
    players.forEach((p) => (totals[p] = 0));
    scores.forEach(({ scores }) => {
      players.forEach((p) => {
        totals[p] += Number(scores[p]) || 0;
      });
    });
    return totals;
  };

  const totals = calculateTotals();

  const winner = Object.entries(totals).find(([_, points]) => points >= 100);

  return (
  <div className="container">
    <h1 className="title">Ligretto Score Tracker</h1>
      {!gameStarted ? (
        <PlayerInput onStart={addPlayers} />
      ) : winner ? (
        <div>
          <h2>Spiel beendet!</h2>
          <h3>Gewinner: {winner[0]} mit {winner[1]} Punkten 🎉</h3>
          <Scoreboard players={players} scores={scores} totals={totals} />
          <button onClick={() => {
            setPlayers([]);
            setScores([]);
            setRound(1);
            setGameStarted(false);
          }}>
            Neues Spiel starten
          </button>
        </div>
      ) : (
        <>
          <ScoreInput players={players} round={round} onSubmit={addScores} />
          <Scoreboard players={players} scores={scores} totals={totals} />
        </>
      )}
    </div>
  );
}
