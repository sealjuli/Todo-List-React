import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TaskInput } from "./TaskInput";
import { Tasks } from "./Tasks";
import { RoutesClass } from "../helpers/Routes";
import "../App.css";

export function Todo() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${RoutesClass.todos}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          console.log(`Ошибка HTTP: ${response.status}`);
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const json = await response.json();
        json.map((task) => (task.isUpdating = false));
        setTasks(json);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    };

    fetchTasks();
  }, []);

  const onClickLogout = () => {
    navigate(`${RoutesClass.root}${RoutesClass.login}`);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <TaskInput setTasks={setTasks}></TaskInput>
      <Tasks tasks={tasks} setTasks={setTasks}></Tasks>
      <p className="logout" onClick={onClickLogout}>
        "Log out"
      </p>
    </div>
  );
}
