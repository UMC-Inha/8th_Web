// 1. html 요소 선택 (핸드북 js 참고)

// as HTML~~~ 이거 쓰는 거 암기. html에서 쓴 "todo-~~~" 용어 가져온것!
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 애인지 type(or interface) 정의
type Todo = { // 무조건 잇을 애들 
    id: number;
    text: string;
};

// todolist와 donelist를 관리하기 위한 빈 배열
let todos: Todo[] = [];
let donetasks: Todo[] = [];

// - 할 일 목록 렌더링 하는 함수 정의
const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false); // 할 일 코너에 들어갈 리스트에 대하여 
        todoList.appendChild(li); // list들을 밀어넣어줌
    });
    donetasks.forEach((todo): void => {
        const li = createTodoElement(todo, true); // 완료료 코너에 들어갈 리스트에 대하여 
        doneList.appendChild(li); // list들을 밀어넣어줌
    })
};

// 3. 할 일 텍스트 입력 처리 함수 (공백 잘라줌)
const getTodoText = (): string => {
    return todoInput.value.trim(); // 공백 자르기 
};

// 4. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
    todos.push({id: Date.now(), text: text }); // id는 안겹칠거같은애로걍넣은것, text는 작성한문구
    todoInput.value = ''; // input에 작성한 문구 지워주기
    renderTasks(); // 다시 렌더링
};

// 5. 할 일 상태 변경 (완료상태로 이동)
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id); // filter는 보통 제거할 때 사용
    // 클릭한 id를 제외한 나머지를 다 보여줌(렌더링) 으로서 클릭한 건 할 일 코너에서 사라지게 됨
    donetasks.push(todo); // 클릭한 건 완료 코너 쪽에다 추가
    renderTasks();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
    donetasks = donetasks.filter((t): boolean => t.id !== todo.id); 
    renderTasks();
};

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정) (까다롭디)
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li'); // list라는 태그를 생성하는
    li.classList.add('render-container__item'); // classList에 add를 이용해 ''저거 넣 
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) { 
        button.textContent = '삭제'; // 완료된 투두는 삭제 버튼이 될거고
        button.style.backgroundColor = '#dc3545';
    } else {
        button.textContent = '완료'; // 완료 전 투두는 완료 버튼이 될거다
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => { // 클릭 이란 이벤트를 할 때
        if (isDone) { // 완료된 투두엔 deleteTodo() 함수 적용  
            deleteTodo(todo);
        } else { // 완료 전 투두엔 completeTodo() 함수 적용
            completeTodo(todo);
        }
    });

    li.appendChild(button); // li에 button을 밀어넣어줌
    return li;
};
// <ul id="todo-list" class="render-container__list">
//  <li class="render-container__item">
//     <p class="render-container__item-text">이거공부</p>
//     <button class="render-container__item-button">완료</button>
//  </li>
// </ul>

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault(); // 새로고침 해도 값이 초기화되지 않도록
    const text = getTodoText(); // 공백 제거된 텍스트 가져옴
    if (text) { // 값이 있으면
        addTodo(text); // 할 일 코너에 추가 
    }
});
renderTasks();