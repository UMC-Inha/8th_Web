import { useTodo } from "./TodoContext";

function DoneList() {
  const { dones, deleteDone } = useTodo();

  return (
    <div className="done">
      <h2>해낸 일</h2>
      <ul>
        {dones.map((done, idx) => (
          <li key={idx}>
            {done}
            <button className="delete-btn" onClick={() => deleteDone(idx)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoneList;
