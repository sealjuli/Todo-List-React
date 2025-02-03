import React, { useState } from "react";
import { TaskInputWithLogger } from "./TaskInputWithLogger";
import { TasksWithLogger } from "./TasksWithLogger";
import "../App.css";

export function Todo() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <TaskInputWithLogger setTasks={setTasks}></TaskInputWithLogger>
      <TasksWithLogger tasks={tasks} setTasks={setTasks}></TasksWithLogger>
      <p className="logout">"Log out"</p>
    </div>
  );
}
