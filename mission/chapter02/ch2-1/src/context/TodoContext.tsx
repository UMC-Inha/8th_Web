import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>
(undefined); // context에 대한 상태를 알 수가 없어서 undefined

// 어떤 곳이든 바로 사용할 수 있게 우산을 씌우는 늬낌
export const TodoProvider = ({ children }: PropsWithChildren): Element => {
    const [todos, setTodos] = useState<TTodo[]> ([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]> ([]);

    const addTodo = (text: string): void => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
        // 이전 목록은 유지하고, 새로운 것만 넣어주면 된다
    };
    
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
    <TodoContext.Provider 
    value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
        {children}
    </TodoContext.Provider>
    );
};

export const useTodo = (): ITodoContext => {
    const context = useContext(TodoContext);
    if (!context) { // context가 없을 때
        throw new Error(
            'useTodo를 사용하기 위해서는 무조건 TodoProvider로 감싸야 함'
        );
    }

    return context; //context가 있을 때
};