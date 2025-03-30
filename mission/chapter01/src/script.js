var inputElement = document.getElementById('todo-input');
var addTodoBtn = document.getElementById('todo-add-btn');
var todoContainer = document.getElementById('todo-container');
var completeContainer = document.getElementById('complete-container');
function addTodo() {
    if (!inputElement || !todoContainer)
        return;
    var inputValue = inputElement.value.trim(); // 입력 값의 좌우 공백 제거
    if (inputValue.length === 0) { // 입력 값이 없는 경우
        alert("할 일을 입력해주세요!");
        return;
    }
    var todoBox = document.createElement('div');
    todoBox.classList.add('todo-box');
    var todoText = document.createElement('span');
    todoText.innerText = inputValue;
    var completeBtn = document.createElement('button');
    completeBtn.innerText = '완료';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', function () { return moveToComplete(todoBox, inputValue); });
    // () => 를 사용해야하는 이유
    // 이벤트가 발생하기도 전에 moveToComplete 함수가 즉시 실행됌
    todoBox.appendChild(todoText);
    todoBox.appendChild(completeBtn);
    todoContainer.appendChild(todoBox);
    inputElement.value = '';
}
function moveToComplete(todoBox, text) {
    if (!completeContainer)
        return;
    var completeBox = document.createElement('div');
    completeBox.classList.add('complete-box');
    var completeText = document.createElement('span');
    completeText.innerText = text;
    var deleteBtn = document.createElement('button');
    deleteBtn.innerText = '삭제';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        completeBox.remove();
    });
    completeBox.appendChild(completeText);
    completeBox.appendChild(deleteBtn);
    completeContainer.appendChild(completeBox);
    todoBox.remove();
}
addTodoBtn.addEventListener('click', addTodo);
// Typescript Document 요소 다루기
// getElementById()로 HTML 태그를 불러올 때 리턴받는 DOM객체는 HTMLElement | null 타입임
// 즉, value 속성을 사용할 수 없음! -> as HTMLInputElement를 사용 + non null assertion
// Js로 동적 요소 추가 : appendChild
