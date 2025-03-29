// form에 관련한 ui를 따로 제작
// input, setInput, handleSubmit 연결 (Todo.tsx 참고)

import { FormEvent, useState } from "react";
import { useTodo } from '../context/TodoContext';

export const TodoForm = () => {
    const [input, setInput] = useState<string>('');
    const { addTodo } = useTodo();
    
    // 할 일 입력에 입력한 값을 할 일 코너에 넣는 함수 
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // 새로고침해서 없어지는거 방지
        const text = input.trim(); // 공백 자르기

        if (text) {
            addTodo(text);
            setInput('');
        }
    };

  return (
    <form onSubmit={handleSubmit} id="todo-form" className="todo-container__form">
    <input 
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text" 
        id="todo-input" 
        className="todo-container__input"
        placeholder="할 일 입력"
        required 
    />
    <button type="submit" className="todo-container__button">
        할 일 추가
    </button>
</form>
  )
}
