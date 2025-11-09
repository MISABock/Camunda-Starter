import { useEffect, useRef } from "react";
import { Form } from "@bpmn-io/form-js";

export default function CamundaFormRenderer({ schema, data, onSubmit }) {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (!schema) return;

    const form = new Form({
      container: containerRef.current
    });

    formRef.current = form;

    // Wichtig: Schema + Initialdaten aus Camunda laden
    form.importSchema(schema, data || {});

    return () => {
      form.destroy();
    };

  }, [schema, data]);

  async function handleSubmit() {
    if (!formRef.current) return;

    const submitted = await formRef.current.submit();
    onSubmit(submitted.data);
  }

  return (
    <div>
      <div ref={containerRef} />
      <button onClick={handleSubmit}>Absenden</button>
    </div>
  );
}
