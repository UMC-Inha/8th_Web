import { useTodo } from "./TodoContext";

function InputField() {
  const { inputValue, setInputValue, addTodo } = useTodo();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="input-container">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="스터디 계획을 작성해보세요!"
      />
    </div>
  );
}

export default InputField;
