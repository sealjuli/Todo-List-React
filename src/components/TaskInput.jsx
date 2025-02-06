import { useState } from "react";
import { RoutesClass } from "../helpers/Routes";

export const TaskInput = ({ setTasks }) => {
  const [value, setValue] = useState("");

  const onAddTask = async () => {
    if (!value) return;
    const response = await fetch(`${import.meta.env.VITE_API_URL}${RoutesClass.todos}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ title: value }),
    });

    if (response.ok) {
      const json = await response.json();
      json.isUpdating = false;
      setTasks((tasks) => [...tasks, json]);
    } else if (response.status === 400) {
      console.log(await response.json());
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }

    setValue("");
  };

  const onAddTaskHandle = (event) => {
    setValue(event.target.value);
  };

  const onEnterAddTask = (event) => {
    if (event.key === "Enter") return onAddTask();
  };

  return (
    <div>
      <h2>{"Get things done!"}</h2>
      <input
        placeholder="What is the task today?"
        onChange={onAddTaskHandle}
        value={value}
        onKeyDown={(event) => onEnterAddTask(event)}
      />
      <button onClick={onAddTask}>{"Add task"}</button>
    </div>
  );
};
