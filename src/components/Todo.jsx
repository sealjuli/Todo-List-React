import React, { useState, useCallback } from "react";
import { TaskInputWithLogger } from "./TaskInput";
import { TasksWithLogger } from "./Tasks";
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
