import React from "react";

export default function Pagination({ total, current, setCurrent }) {
  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={() => setCurrent(current - 1)} disabled={current === 1}>Prev</button>
      {Array.from({ length: total }, (_, i) => (
        <button key={i} onClick={() => setCurrent(i + 1)} disabled={current === i + 1}>{i + 1}</button>
      ))}
      <button onClick={() => setCurrent(current + 1)} disabled={current === total}>Next</button>
    </div>
  );
}