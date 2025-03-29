// 여기다 저번주과제 html 옮겨오는 것, UI 구현
import { FormEvent, useState } from 'react';
import { TTodo } from '../types/todo';

const TodoBefore = ()  => {
    const [todos, setTodos] = useState<TTodo[]> ([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]> ([]);
    const [input, setInput] = useState<string>('');

    // 할 일 입력에 입력한 값을 할 일 코너에 넣는 함수 
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); // 새로고침해서 없어지는거 방지
        const text = input.trim(); // 공백 자르기

        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            // 이전 목록은 유지하고, 새로운 것만 넣어주면 된다
            setInput('');
        }
    }

    // 할 일 코너에서 완료 코너로 넘어가는 함수
    const completeTodo = (todo: TTodo): void => {
        setTodos(prevTodos => prevTodos.filter((t) : boolean => t.id !== todo.id));
        setDoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
    }

    // 완료코너에서 삭제하는 함수
    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos(prevDoneTodos => prevDoneTodos.filter((t): boolean => t.id !== todo.id));
    }

    return (
    <div className = "todo-container">
        <h1 className="todo-container__header">TERI TODO</h1>
        {/* <TodoForm /> */}
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

        <div className = "render-container">
            <div className="render-container__section">
                <h2 className="render-container__title">할 일</h2>
                <ul id="todo-list" className="render-container__list">
                    {todos.map((todo) =>  // 렌더링 시, 하나하나 순회하겠다
                    <li key={todo.id} className="render-container__item">
                    <span className="render-container__item-text">{todo.text}</span>
                    <button className="render-container__item-button"
                        onClick={(): void => completeTodo(todo)}
                        style={{backgroundColor: '#28a745'}}>완료</button>
                </li>
            )} 
                </ul>
            </div>

            <div className="render-container__section">
                <h2 className="render-container__title">완료</h2>
                <ul id="todo-list" className="render-container__list">
                    {doneTodos.map((todo =>
                        <li key={todo.id} className="render-container__item">
                        <span className="render-container__item-text">{todo.text}</span>
                        <button className="render-container__item-button"
                            onClick={():void => deleteTodo(todo)}
                            style={{backgroundColor: '#dc3545'}}>삭제</button>
                    </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    </div>
    )
};

export default TodoBefore;

