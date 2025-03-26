import { useTodo } from "./TodoContext";

function TodoList() {
  const { todos, completeTodo } = useTodo();

  return (
    <div className="todo">
      <h2>해야 할 일</h2>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            {todo}
            <button className="complete-btn" onClick={() => completeTodo(idx)}>
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
