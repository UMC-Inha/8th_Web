document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("taskInput");
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");

  // 할 일 항목 생성 함수
  function createTask(task, completed) {
    const item = document.createElement("li");
    item.textContent = task;

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
      };
    }

    item.appendChild(btn);
    return item;
  }

  // 할 일 추가 함수
  function addTask() {
    if (input.value.trim() !== "") {
      const task = createTask(input.value.trim(), false);
      todoList.appendChild(task);
      input.value = "";
    }
  }

  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });
});
