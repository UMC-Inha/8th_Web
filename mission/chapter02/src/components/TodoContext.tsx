import { createContext, useContext, useState, ReactNode } from "react";

//전역상태로 아래 todos, ... 등을 관리함
// =>  useTodoContext()로 필요한 데이터에 언제든 접근 가능
interface TodoContextType {
  todos: { id: number; text: string }[];
  doneTasks: { id: number; text: string }[];
  addTodo: (text: string) => void;
  completeTask: (task: { id: number; text: string }) => void;
  deleteTask: (task: { id: number; text: string }) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

//ReactNode 안쓰면 에러
//PropsWithChildren 사용하는 것이 좋다.
export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [doneTasks, setDoneTasks] = useState<{ id: number; text: string }[]>(
    []
  );

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const completeTask = (task: { id: number; text: string }) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const deleteTask = (task: { id: number; text: string }) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, doneTasks, addTodo, completeTask, deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "Error: TodoContext.Provider 없이 useTodoContext 사용 불가"
    );
  }
  return context;
};
