import { useState } from "react";

export default function StartProcess() {
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  async function startProcess() {
    setLoading(true);

    await fetch("http://localhost:8080/engine-rest/process-definition/key/helloProcess/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variables: {} })
    });

    setLoading(false);
    setStarted(true);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Prozess starten</h2>
      <button onClick={startProcess} disabled={loading}>
        {loading ? "Starte..." : "Prozess starten"}
      </button>

      {started && <p>✅ Prozess wurde gestartet!</p>}
    </div>
  );
}
