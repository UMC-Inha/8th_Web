document.addEventListener("DOMContentLoaded", () => {
    const studyInput = document.getElementById("study-input") as HTMLInputElement;
    const todoList = document.getElementById("todo-list") as HTMLUListElement;
    const doneList = document.getElementById("done-list") as HTMLUListElement;
  
    if (!studyInput || !todoList || !doneList) return;
  
    // Enter 키 입력 시 추가 이벤트
    studyInput.addEventListener("keypress", (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        addTask(studyInput.value);
        studyInput.value = "";
      }
    });
  
    function addTask(task: string): void {
      if (task.trim() === "") return;
  
      const li: HTMLLIElement = document.createElement("li");
      li.innerHTML = `
        ${task}
        <button class="complete-btn">완료</button>
      `;
  
      const completeBtn = li.querySelector(".complete-btn") as HTMLButtonElement;
      completeBtn.addEventListener("click", () => {
        moveToDone(li, task);
      });
  
      todoList.appendChild(li);
    }
  
    function moveToDone(taskElement: HTMLLIElement, task: string): void {
      taskElement.remove();
  
      const li: HTMLLIElement = document.createElement("li");
      li.innerHTML = `
        ${task}
        <button class="delete-btn">삭제</button>
      `;
  
      const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;
      deleteBtn.addEventListener("click", () => {
        li.remove();
      });
  
      doneList.appendChild(li);
    }
  });
  