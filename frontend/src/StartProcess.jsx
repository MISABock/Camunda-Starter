// src/StartProcess.jsx
import { useState } from "react";

async function openNextTask() {
  // 1. offene Tasks laden
  const res = await fetch("http://localhost:8080/engine-rest/task?assignee=demo");
  const tasks = await res.json();
  if (!tasks.length) {
    alert("Keine offenen User Tasks gefunden");
    return;
  }

  const taskId = tasks[0].id;

  // 2. Form-Key für diese Task laden
  const formRes = await fetch(`http://localhost:8080/engine-rest/task/${taskId}/form`);
  const formInfo = await formRes.json(); // { key: "http://localhost:3000/task?form=userInput&taskId={taskId}" }
  let url = formInfo.key || "";

  // 3. {taskId} im formKey ersetzen, falls vorhanden
  url = url.replace("{taskId}", taskId);

  // 4. Fallback falls taskId nicht im formKey steckt
  if (!url.includes("taskId=")) {
    const sep = url.includes("?") ? "&" : "?";
    url = `${url}${sep}taskId=${taskId}`;
  }

  // 5. weiterleiten
  window.location.href = url;
}

export default function StartProcess() {
  const [loading, setLoading] = useState(false);

  async function startProcess() {
    setLoading(true);

    await fetch("http://localhost:8080/engine-rest/process-definition/key/HelloProcess1/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ variables: {} })
    });

    await openNextTask();
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Prozess starten</h2>
      <button onClick={startProcess} disabled={loading}>
        {loading ? "Starte..." : "Prozess starten"}
      </button>
    </div>
  );
}
