import React from "react";

export default function Scoreboard({ players, scores, totals }) {
  return (
    <div>
      <h2>Zwischenstand</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Spieler</th>
            {scores.map(({ round }) => (
              <th key={round} style={{ border: "1px solid #ccc", padding: 8 }}>
                Runde {round}
              </th>
            ))}
            <th style={{ border: "1px solid #ccc", padding: 8 }}>Gesamt</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p}>
              <td style={{ border: "1px solid #ccc", padding: 8, fontWeight: "bold" }}>{p}</td>
              {scores.map(({ scores }, i) => (
                <td key={i} style={{ border: "1px solid #ccc", padding: 8 }}>
                  {scores[p]}
                </td>
              ))}
              <td style={{ border: "1px solid #ccc", padding: 8, fontWeight: "bold" }}>
                {totals[p]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
