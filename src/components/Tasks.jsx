import { Task } from "./Task";

export const Tasks = ({ tasks, setTasks, logging }) => {
  const divTasks = tasks.map((task) => (
    <Task key={task.key} task={task} setTasks={setTasks} logging={logging} />
  ));

  return <div>{divTasks}</div>;
};
