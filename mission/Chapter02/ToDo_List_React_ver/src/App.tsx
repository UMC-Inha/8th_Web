import "./App.css";
import { TodoProvider } from "./TodoContext";
import InputField from "./InputField";
import TodoList from "./TodoList";
import DoneList from "./DoneList";

function App() {
  return (
    <TodoProvider>
      <h1>UMC Study Plan</h1>
      <InputField />
      <div className="study-container">
        <TodoList />
        <DoneList />
      </div>
    </TodoProvider>
  );
}

export default App;
