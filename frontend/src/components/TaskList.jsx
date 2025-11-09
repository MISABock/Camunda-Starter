import { useEffect, useState } from "react";

export default function TaskList({ onSelect }) {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/engine-rest/task")
      .then(r => r.json())
      .then(setTasks);
  }, []);

  return (
    <div>
      <h2>Aufgaben</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <button onClick={() => onSelect(t)}>
              {t.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
