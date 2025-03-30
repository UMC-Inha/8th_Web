// ✅ HTML 요소 가져오기
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement; // 기존 코드에서 todo-list로 중복 선언된 오류 수정

// ✅ 할 일(Todo) 타입 선언
type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// ✅ 먼저 `createTodoElement`를 정의 (순서 중요!!)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.text;

    const button = document.createElement("button");
    button.classList.add("render-container__item-button");

    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
        button.addEventListener("click", () => deleteTodo(todo));
    } else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
        button.addEventListener("click", () => completeTodo(todo));
    }

    li.appendChild(button);
    return li;
};

// ✅ `renderTasks`를 `createTodoElement` 이후에 선언
const renderTasks = (): void => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// ✅ 할 일 추가 함수
const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTasks();
};

// ✅ 완료 처리 함수
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

// ✅ 삭제 함수
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};

// ✅ 폼 제출 이벤트 (할 일 추가)
todoForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
    }
});

// ✅ 🔹 `DOMContentLoaded` 이후 실행 보장
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
});

