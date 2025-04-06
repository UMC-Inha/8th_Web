import { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [doneTasks, setDoneTasks] = useState<string[]>([]);

  const addTodo = (text: string) => {
    setTodos((prevTodos) => [...prevTodos, text]);
  };

  const completeTask = (task: string) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t !== task));
    setDoneTasks((prevDone) => [...prevDone, task]);
  };

  const deleteTask = (task: string) => {
    setDoneTasks((prevDone) => prevDone.filter((t) => t !== task));
  };

  return (
    <div className="todo-container">
      <h1 className="title">UMC TODO</h1>
      <TodoList
        todos={todos}
        doneTasks={doneTasks}
        addTodo={addTodo}
        completeTask={completeTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
