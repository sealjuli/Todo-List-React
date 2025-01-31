import { useState } from "react";
import "../App.css";

const Tasks = ({ tasks, setTasks, logging }) => {
  const [inputValue, setInputValue] = useState("");

  const onClickDelete = (key) => {
    const deletedTask = tasks.splice(
      tasks.findIndex((val) => val.key === key),
      1
    );
    setTasks([...tasks]);
    logging("Удалили таску", deletedTask[0]);
  };

  const onClickUpdate = (key, value) => {
    setTasks((tasks) =>
      tasks.map((val) =>
        val.isUpdating === true ? { ...val, isUpdating: false } : val
      )
    );
    setInputValue(value);
    setTasks((tasks) =>
      tasks.map((val) => (val.key === key ? { ...val, isUpdating: true } : val))
    );
  };

  const onChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const updateTask = (key) => {
    setTasks((tasks) =>
      tasks.map((val) =>
        val.key === key ? { ...val, value: inputValue, isUpdating: false } : val
      )
    );
    logging(
      "Обновили таску",
      tasks.find((val) => val.key === key)
    );
  };

  const taskOnClick = (key) => {
    setTasks((tasks) =>
      tasks.map((val) =>
        val.key === key ? { ...val, isDone: !val.isDone } : val
      )
    );
  };

  const divTasks = tasks.map((task) => {
    return (
      <div key={task.key} className={task.isUpdating ? "task isUpdating" : "task"}>
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
              src="/update.png"
              onClick={() => onClickUpdate(task.key, task.value)}
            ></img>
            <img
              className="icon"
              src="/basket.png"
              onClick={() => onClickDelete(task.key)}
            ></img>
          </>
        )}
      </div>
    );
  });

  return <div>{divTasks}</div>;
};

export default Tasks;
