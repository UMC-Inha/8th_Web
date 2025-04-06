import "./TodoItem.css";

interface TodoItemProps {
  task: string;
  onClick: () => void;
  buttonText: string;
}

export default function TodoItem({ task, onClick, buttonText }: TodoItemProps) {
  return (
    <li className="todo-item">
      <span className="todo-text">{task}</span>
      <button onClick={onClick}>{buttonText}</button>
    </li>
  );
}
