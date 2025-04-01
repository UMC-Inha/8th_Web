//mission에서 실습 후 복붙
//
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decreaseCount = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      <h2>{count}</h2>
      <button onClick={increaseCount}>증가</button>
      <button onClick={decreaseCount}>감소</button>
    </>
  );
}

export default App;
