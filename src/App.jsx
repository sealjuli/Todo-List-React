import React, { useState } from "react";
import TaskInputWithLogger from "./components/TaskInputWithLogger";
import TasksWithLogger from "./components/TasksWithLogger";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
      <TaskInputWithLogger setTasks={setTasks}></TaskInputWithLogger>
      <TasksWithLogger tasks={tasks} setTasks={setTasks}></TasksWithLogger>
      <p className="logout">{"Log out"}</p>
    </div>
  );
}

export default App;
