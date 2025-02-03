import { useState } from "react";

export const TaskInput = ({ setTasks, logging }) => {
  const [value, setValue] = useState("");

  const onClick = () => {
    if (value) {
      const uuid = crypto.randomUUID();
      setTasks((tasks) => [
        ...tasks,
        { value, key: uuid, isUpdating: false, isDone: false },
      ]);
      setValue("");
      logging("Добавили таску", {
        value,
        key: uuid,
        isUpdating: false,
        isDone: false,
      });
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <h2>{"Get things done!"}</h2>
      <input
        placeholder="What is the task today?"
        onChange={onChange}
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") return onClick();
        }}
      />
      <button onClick={onClick}>{"Add task"}</button>
    </div>
  );
};
