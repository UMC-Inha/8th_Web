import { FormEvent, useState } from "react"
import { TTodo } from "../types/todo";
import Form from "./Form";
import Section from "./Section";
import { useDark } from "../context/darkProvider";

const Todo = () => {
    const {isDark, setIsDark} = useDark();
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
    const [input, setInput] = useState<string>('');
    
    const changeDarkMode = () =>{
        setIsDark(prev => (!prev));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
        console.log('동작함');
        if (text) {
            const newTodo: TTodo = { id: Date.now(), text };
            setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
            setInput('');
        }
    };

    const completeTodo = (todo: TTodo) => {
        setTodos(prevTodo => prevTodo.filter(t => t.id !== todo.id)); // 완료 버튼을 누르지 않은 todo들만 filtering!
        setDoneTodos(prevDoneTodo => [...prevDoneTodo, todo]);
    };

    const deleteTodo = (doneTodo: TTodo) => {
        setDoneTodos(prevDoneTodo => prevDoneTodo.filter(dt => dt.id !== doneTodo.id));
    }

    return (
        
        <div className='todo-container' style={{backgroundColor: isDark? 'black' : 'white'}}>
            <button onClick={changeDarkMode} className="todo-container__button" style={{backgroundColor: isDark? 'white' : '#3c3c3c', color: isDark? 'black' : 'white'}}>
                {isDark ? "라이트 모드" : "다크 모드"}
            </button>
            <h1 className='todo-container__header' style={{color: isDark? 'white' : 'black'}}>HWAN TODO</h1>
            <Form 
                onSubmit={handleSubmit}
                input={input}
                onChange={(e) => setInput(e.target.value)}
                text= '할 일 추가' />
            <div className='render-container'>
                <Section 
                    title="할 일"
                    todos={todos}
                    onClick={completeTodo}
                    backgroundColor="#28a745"
                    button_name="완료"
                />
                <Section 
                    title="완료"
                    todos={doneTodos}
                    onClick={deleteTodo}
                    backgroundColor="#dc3545"
                    button_name="삭제"
                />
            </div>
        </div>
    )
}

export default Todo