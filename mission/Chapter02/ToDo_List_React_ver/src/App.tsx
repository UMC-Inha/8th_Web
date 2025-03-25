import { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<string[]>([]);
  const [dones, setDones] = useState<string[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTodos([...todos, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleComplete = (index: number) => {
    const task = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setDones([...dones, task]);
  };

  const handleDelete = (index: number) => {
    setDones(dones.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>UMC Study Plan</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="스터디 계획을 작성해보세요!"
        />
      </div>
      <div className="study-container">
        <div className="todo">
          <h2>해야 할 일</h2>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <button className="complete-btn" onClick={() => handleComplete(index)}>완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="done">
          <h2>해낸 일</h2>
          <ul>
            {dones.map((done, index) => (
              <li key={index}>
                {done}
                <button className="delete-btn" onClick={() => handleDelete(index)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
