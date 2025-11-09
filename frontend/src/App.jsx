import { useState } from "react";
import TaskList from "./components/TaskList";
import LoadCamundaForm from "./components/LoadCamundaForm";
import CamundaFormRenderer from "./components/CamundaFormRenderer";

export default function App() {

  const [selectedTask, setSelectedTask] = useState(null);
  const [formJson, setFormJson] = useState(null);

  async function submit(data) {

    const payload = { variables: {} };

    for (const key in data) {
      payload.variables[key] = { value: data[key] };
    }

    await fetch(
      "http://localhost:8080/engine-rest/task/" + selectedTask.id + "/submit-form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    alert("Task abgeschlossen");

    setSelectedTask(null);
    setFormJson(null);
  }

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <TaskList onSelect={setSelectedTask} />

      <div>
        {selectedTask && (
          <>
            <LoadCamundaForm task={selectedTask} onLoaded={setFormJson} />
            {formJson && (
              <CamundaFormRenderer
                formJson={formJson}
                onSubmit={submit}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
 