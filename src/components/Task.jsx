import React from "react";
import "../App.css";

export const Task = React.memo(
  ({
    task,
    onClickDelete,
    onClickUpdate,
    onUpdateTask,
    onDoneTask,
    inputValue,
    onChangeInput,
  }) => {
    const inputOnKeyDown = (event) => {
      if (event.key === "Enter") return onUpdateTask(task);
    };

    return (
      <div
        key={task.id}
        className={task.isUpdating ? "task isUpdating" : "task"}
      >
        {task.isUpdating ? (
          <>
            <input
              autoFocus
              onChange={onChangeInput}
              onKeyDown={(e) => inputOnKeyDown(e)}
              value={inputValue}
            />
            <button onClick={() => onUpdateTask(task)}>{"Update"}</button>
          </>
        ) : (
          <>
            <span
              onClick={() => onDoneTask(task)}
              className={task.isCompleted ? "taskSpan done" : "taskSpan"}
            >
              {task.title}
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
);
