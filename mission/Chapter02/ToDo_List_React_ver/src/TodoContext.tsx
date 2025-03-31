import { createContext, useContext, useState, ReactNode } from "react";

interface TodoContextType {
  todos: string[];
  dones: string[];
  inputValue: string;
  setInputValue: (v: string) => void;
  addTodo: () => void;
  completeTodo: (index: number) => void;
  deleteDone: (index: number) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error(
      "useTodo can only be used inside a component wrapped with TodoProvider"
    );
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [dones, setDones] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const completeTodo = (index: number) => {
    const task = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setDones([...dones, task]);
  };

  const deleteDone = (index: number) => {
    setDones(dones.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        dones,
        inputValue,
        setInputValue,
        addTodo,
        completeTodo,
        deleteDone,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
