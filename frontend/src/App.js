import { useState } from "react";
import TaskList from "./components/TaskList";
import LoadCamundaForm from "./components/LoadCamundaForm";
import CamundaFormRenderer from "./components/CamundaFormRenderer";
import "@bpmn-io/form-js/dist/assets/form-js.css";

export default function App() {

  const [selectedTask, setSelectedTask] = useState(null);
  const [formJson, setFormJson] = useState(null);

  async function submitForm(data) {

    // Payload für Camunda erzeugen
    const payload = { variables: {} };

    for (const key in data) {
      payload.variables[key] = { value: data[key] };
    }

    // Formular absenden
    await fetch(
      "http://localhost:8080/engine-rest/task/" + selectedTask.id + "/submit-form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    // Nach Submit automatisch den nächsten Task laden
    const newTasks = await fetch(
      "http://localhost:8080/engine-rest/task?assignee=demo"
    ).then(r => r.json());

    if (newTasks.length > 0) {
      // Nächste UserTask sofort anzeigen
      setSelectedTask(newTasks[0]);
      setFormJson(null); // sorgt dafür, dass LoadCamundaForm die neue Form lädt
    } else {
      // Wenn keine Aufgaben mehr existieren
      setSelectedTask(null);
      setFormJson(null);
      alert("Keine weiteren Aufgaben.");
    }
  }

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <TaskList onSelect={setSelectedTask} />

      <div>
        {selectedTask && (
          <>
            {/* Lädt automatisch das richtige Formular */}
            <LoadCamundaForm task={selectedTask} onLoaded={setFormJson} />

            {formJson && (
              <CamundaFormRenderer
                schema={formJson.schema}
                data={formJson.data}
                onSubmit={submitForm}
              />

            )}
          </>
        )}
      </div>
    </div>
  );
}
