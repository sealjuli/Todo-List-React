import { useState } from "react";
import { withLogger } from "./withLogger";

const TaskInput = ({ setTasks, logging }) => {
  const [value, setValue] = useState("");

  const onAddTask = () => {
    if (!value) return;

    const uuid = crypto.randomUUID();
    setTasks((tasks) => [
      ...tasks,
      { value, id: uuid, isUpdating: false, isDone: false },
    ]);
    setValue("");
    logging("Добавили таску", value);
  };

  const onAddTaskHandle = (e) => {
    setValue(e.target.value);
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
        onKeyDown={(e) => onEnterAddTask(e)}
      />
      <button onClick={onAddTask}>{"Add task"}</button>
    </div>
  );
};

export const TaskInputWithLogger = withLogger(TaskInput);