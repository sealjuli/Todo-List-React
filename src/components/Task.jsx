import { useState } from "react";
import "../App.css";

export function Task({ task, setTasks, logging }) {
  const [inputValue, setInputValue] = useState("");

  const onClickDelete = ({ key, value }) => {
    setTasks((tasks) => tasks.filter((task) => task.key != key));
    logging("Удалили таску", value);
  };

  const onClickUpdate = ({ key, value }) => {
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

  const updateTask = ({ key, value }) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.key === key
          ? { ...task, value: inputValue, isUpdating: false }
          : task
      )
    );
    logging("Обновили таску", value);
  };

  const taskOnClick = ({key, value}) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.key === key ? { ...task, isDone: !task.isDone } : task
      )
    );

    logging("Нажатие на таску", value);
  };

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
              if (e.key === "Enter") return updateTask(task);
            }}
            value={inputValue}
          />
          <button onClick={() => updateTask(task)}>{"Update"}</button>
        </>
      ) : (
        <>
          <span
            onClick={() => taskOnClick(task)}
            className={task.isDone ? "taskSpan done" : "taskSpan"}
          >
            {task.value}
          </span>
          <img
            className="icon"
            src="update.png"
            onClick={() => onClickUpdate(task)}
          ></img>
          <img
            className="icon"
            src="basket.png"
            onClick={() => onClickDelete(task)}
          ></img>
        </>
      )}
    </div>
  );
}
