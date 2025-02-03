import { useCallback, useState } from "react";
import { Task } from "./Task";
import { withLogger } from "./withLogger";

const Tasks = ({ tasks, setTasks, logging }) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeInput = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const onClickDelete = useCallback(({ id, value }) => {
    setTasks((tasks) => tasks.filter((task) => task.id != id));
    logging("Удалили таску", value);
  }, []);

  const onClickUpdate = useCallback(({ id, value }) => {
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
    setInputValue(value);
  }, []);

  const onUpdateTask = useCallback(
    ({ id, value }) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === id
            ? { ...task, value: inputValue, isUpdating: false }
            : task
        )
      );
      logging("Обновили таску", value);
    },
    [inputValue]
  );

  const onDoneTask = useCallback(({ id, value }) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );

    logging("Нажатие на таску", value);
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

export const TasksWithLogger = withLogger(Tasks);
