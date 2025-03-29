import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { useTodo } from '../context/TodoContext';

const Todo = () => {
    const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
    // todos에 대한 상태는 useTodo()를 통해 꺼내올 수 있게 됨

    
    
// TodoForm, TodoList 사용을 통해 Todobefore.tsx UI에 비해 매우 컴팩트 해졌음을 확인할 수 있다!

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">TERI TODO</h1>
            <TodoForm  />        
            <div className = "render-container">
                <TodoList 
                title="할 일" 
                todos={todos} 
                buttonLabel="완료"
                buttonColor="#28a745" 
                onClick={completeTodo} 
                />
                <TodoList 
                title="완료" 
                todos={doneTodos} 
                buttonLabel="삭제"
                buttonColor='#dc3545' 
                onClick={deleteTodo} 
                />
            </div>
        </div>
    );
};

export default Todo;