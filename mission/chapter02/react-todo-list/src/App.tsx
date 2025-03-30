import './App.css'
import Todo from './components/Todo';


// Todo list 구조

// [상단 container]
// input box + input btn -> onClick하면 todo box로 추가

// [Main container]
// todo box + comp btn -> onClick하면 complete box로 이동
// complete box + del btn -> onClick하면 삭제 

function App() {
  
  return <>
    <Todo/>
  </>;
}

export default App
