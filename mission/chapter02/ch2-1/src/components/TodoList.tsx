// render-container__list에 관련한 ui를 따로 제작
// Todo.tsx 참고하여 무엇을 불러와야 하는지 확인
import { TTodo } from "../types/todo";

interface TodoListProps {
    title: string;
    todos?: TTodo[];
    buttonLabel: string;
    buttonColor: string;
    onClick:(todo: TTodo) => void;
}

export const TodoList = ({title, todos, buttonLabel, buttonColor, onClick}
    :TodoListProps) => {
  return (
    <div className="render-container__section">
        <h2 className="render-container__title">{title}</h2>
        {/* 할 일 또는 완료 들어갈 수 있게 */}
        <ul id="todo-list" className="render-container__list">
            {todos?.map((todo) => 
                <li key={todo.id} className="render-container__item">
                    <span className="render-container__item-text">{todo.text}</span>
                    <button className="render-container__item-button"
                    onClick={(): void => onClick(todo)} 
                    // completeTodo(todo) 또는 deleteTodo(todo) 들어갈 수 있게
                    style={{backgroundColor: buttonColor}}>{buttonLabel}</button>
                    { /* 상황에 따라 다른 버튼색과 버튼라벨 */ }
                </li>
            )} 
        </ul>
    </div>
  )
}
