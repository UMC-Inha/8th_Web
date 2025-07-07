document.addEventListener("DOMContentLoaded", function () {
  //DOMContentLoaded 이벤트는 HTML 문서의 모든 요소가 로드된 후 실행
  const input = document.getElementById("taskInput") as HTMLInputElement;
  const addBtn = document.getElementById("addBtn")!;
  const todoList = document.getElementById("todoList")!;
  const completedList = document.getElementById("completedList")!;
  //!를 사용 => null이 아님을 TypeScript에 보장

  // 할 일 항목 생성 함수
  function createTask(task: string, completed: boolean) {
    const item = document.createElement("li");
    item.textContent = task; //화면에 표시

    const btn = document.createElement("button");
    if (completed) {
      btn.textContent = "삭제";
      btn.classList.add("delete"); // 삭제는 빨강색(css 사용)
      btn.onclick = function () {
        item.remove();
      };
    } else {
      btn.textContent = "완료";
      btn.onclick = function () {
        item.remove();
        const completedTask = createTask(task, true);
        completedList.appendChild(completedTask);
        // 생성된 완료된 할 일을 completedList에 추가
      };
    }

    item.appendChild(btn); //버튼도 추가
    return item;
  }

  // 할 일 추가 함수
  function addTask() {
    if (input.value.trim() !== "") {
      //공백 아닌 경우만
      const task = createTask(input.value.trim(), false);
      todoList.appendChild(task);
      //completed가 false인 경우 (할 일을 완료하지 않은 경우만) todoList에 추가
      input.value = ""; //입력 필드 지움
    }
  }

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
//버튼이나 엔터로 추가할 수 있도록
