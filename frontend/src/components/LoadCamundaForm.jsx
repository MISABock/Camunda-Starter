import { useEffect } from "react";

const REST = "http://localhost:8080/engine-rest";

export default function LoadCamundaForm({ task, onLoaded }) {

  useEffect(() => {

    console.log("LoadCamundaForm aufgerufen mit Task:", task);
    if (!task) return;

    async function load() {
      try {

        // 1. Task laden
        const taskInfo = await fetch(`${REST}/task/${task.id}`).then(r => r.json());
        console.log("TaskInfo:", taskInfo);
        const processDefinitionId = taskInfo.processDefinitionId;

        // 2. Prozessdefinition → deploymentId
        const definition = await fetch(
          `${REST}/process-definition/${processDefinitionId}`
        ).then(r => r.json());
        const deploymentId = definition.deploymentId;

        // 3. Ressourcen laden
        const resources = await fetch(
          `${REST}/deployment/${deploymentId}/resources`
        ).then(r => r.json());
        console.log("Resources vom Deployment:", resources);

        // 4. FormRef Key bestimmen
        const formRefKey =
          taskInfo.camundaFormRef?.key || taskInfo.formKey || null;

        if (!formRefKey) {
          throw new Error("Task hat keinen camundaFormRef.key.");
        }

        // 5. Form Datei finden
        const formResource = resources.find(r =>
          r.name.endsWith(`${formRefKey}.form`)
        );

        if (!formResource) {
          console.warn("Verfügbare Ressourcen:", resources);
          throw new Error(`Formular ${formRefKey}.form nicht gefunden.`);
        }

        // 6. JSON der Form laden
        const raw = await fetch(
          `${REST}/deployment/${deploymentId}/resources/${formResource.id}/data`
        ).then(r => r.text());

        const schema = JSON.parse(raw);

        // 7. Prozessvariablen laden
        const vars = await fetch(
          `${REST}/task/${task.id}/form-variables`
        ).then(r => r.json());

        const data = {};
        Object.entries(vars).forEach(([key, val]) => {
          data[key] = val.value;
        });

        console.log("Form-Variables:", data);

        // 8. Schema + Daten an Parent senden
        onLoaded({ schema, data });

      } catch (err) {
        console.error("Fehler beim Laden des Formulars:", err);
        onLoaded(null);
      }
    }

    load();

  }, [task, onLoaded]);

  return null;
}
