// ✅ HTML 요소 가져오기
var todoInput = document.getElementById("todo-input");
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list"); // 기존 코드에서 todo-list로 중복 선언된 오류 수정
var todos = [];
var doneTasks = [];
// ✅ 먼저 `createTodoElement`를 정의 (순서 중요!!)
var createTodoElement = function (todo, isDone) {
    var li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.text;
    var button = document.createElement("button");
    button.classList.add("render-container__item-button");
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
        button.addEventListener("click", function () { return deleteTodo(todo); });
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
        button.addEventListener("click", function () { return completeTodo(todo); });
    }
    li.appendChild(button);
    return li;
};
// ✅ `renderTasks`를 `createTodoElement` 이후에 선언
var renderTasks = function () {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
// ✅ 할 일 추가 함수
var addTodo = function (text) {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = "";
    renderTasks();
};
// ✅ 완료 처리 함수
var completeTodo = function (todo) {
    todos = todos.filter(function (t) { return t.id !== todo.id; });
    doneTasks.push(todo);
    renderTasks();
};
// ✅ 삭제 함수
var deleteTodo = function (todo) {
    doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; });
    renderTasks();
};
// ✅ 폼 제출 이벤트 (할 일 추가)
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = todoInput.value.trim();
    if (text) {
        addTodo(text);
    }
});
// ✅ 🔹 `DOMContentLoaded` 이후 실행 보장
document.addEventListener("DOMContentLoaded", function () {
    renderTasks();
});
