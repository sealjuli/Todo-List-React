import { useCallback, useState } from "react";
import { RoutesClass } from "../helpers/Routes";
import { Task } from "./Task";

export const Tasks = ({ tasks, setTasks }) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const onClickDelete = useCallback(async ({ id }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${RoutesClass.todos}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.ok) {
      setTasks((tasks) => tasks.filter((task) => task.id != id));
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  }, []);

  const onClickUpdate = useCallback(({ id, title }) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.isUpdating) {
          return { ...task, isUpdating: false };
        } else if (task.id === id) {
          return { ...task, isUpdating: true };
        } else {
          return task;
        }
      })
    );
    setInputValue(title);
  }, []);

  const onUpdateTask = useCallback(
    async ({ id }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${RoutesClass.todos}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({ title: inputValue }),
        }
      );

      if (response.ok) {
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === id
              ? { ...task, title: inputValue, isUpdating: false }
              : task
          )
        );
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
    },
    [inputValue]
  );

  const onDoneTask = useCallback(async ({ id }) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}${RoutesClass.todos}/${id}/isCompleted`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.ok) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        )
      );
    } else {
      console.log("Ошибка HTTP: " + response.status);
    }
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onClickDelete={onClickDelete}
          onClickUpdate={onClickUpdate}
          onUpdateTask={onUpdateTask}
          onDoneTask={onDoneTask}
          inputValue={inputValue}
          onChangeInput={onChangeInput}
        />
      ))}
    </div>
  );
};
