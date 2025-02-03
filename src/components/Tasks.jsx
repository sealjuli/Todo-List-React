import { useState } from "react";
import "../App.css";

export const Tasks = ({ tasks, setTasks, logging }) => {
  const [inputValue, setInputValue] = useState("");

  const onClickDelete = (key) => {
    const deleteTask = tasks.find((task) => task.key === key);
    setTasks(tasks.filter((task) => task.key != key));
    logging("Удалили таску", deleteTask);
  };

  const onClickUpdate = (key, value) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.isUpdating === true ? { ...task, isUpdating: false } : task
      )
    );
    setInputValue(value);
    setTasks((tasks) =>
      tasks.map((task) =>
        task.key === key ? { ...task, isUpdating: true } : task
      )
    );
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const updateTask = (key) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.key === key
          ? { ...task, value: inputValue, isUpdating: false }
          : task
      )
    );
    logging(
      "Обновили таску",
      tasks.find((task) => task.key === key)
    );
  };

  const taskOnClick = (key) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.key === key ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const divTasks = tasks.map((task) => {
    return (
      <div
        key={task.key}
        className={task.isUpdating ? "task isUpdating" : "task"}
      >
        {task.isUpdating ? (
          <>
            <input
              autoFocus
              onChange={onChangeInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") return updateTask(task.key);
              }}
              value={inputValue}
            />
            <button onClick={() => updateTask(task.key)}>{"Update"}</button>
          </>
        ) : (
          <>
            <span
              onClick={() => taskOnClick(task.key)}
              className={task.isDone ? "taskSpan done" : "taskSpan"}
            >
              {task.value}
            </span>
            <img
              className="icon"
              src="update.png"
              onClick={() => onClickUpdate(task.key, task.value)}
            ></img>
            <img
              className="icon"
              src="basket.png"
              onClick={() => onClickDelete(task.key)}
            ></img>
          </>
        )}
      </div>
    );
  });

  return <div>{divTasks}</div>;
};
