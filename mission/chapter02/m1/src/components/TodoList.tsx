import { useState } from "react";
import "./TodoList.css";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: string[];
  doneTasks: string[];
  addTodo: (text: string) => void;
  completeTask: (task: string) => void;
  deleteTask: (task: string) => void;
}

export default function TodoList({ todos, doneTasks, addTodo, completeTask, deleteTask }: TodoListProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="todo-list">
      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          type="text"
          value={inputValue}
          className="todo-container__input"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할 일 입력"
          required
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul>
            {todos.map((task, index) => (
              <TodoItem key={index} task={task} onClick={() => completeTask(task)} buttonText="완료" />
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul>
            {doneTasks.map((task, index) => (
              <TodoItem key={index} task={task} onClick={() => deleteTask(task)} buttonText="삭제" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
