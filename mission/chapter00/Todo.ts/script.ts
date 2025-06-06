// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

// 2. 할 일 타입 정의
type Todo = {
    id: number;
    text: string;
};

// 3. 상태 변수
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 4. 할 일 렌더링 함수
const renderTasks = (): void => {
    // 기존 리스트 초기화
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) => {
        const li = createTodoElement(todo, false); // false: 할 일
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true); // true: 완료된 할 일
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = ''; 
    renderTasks();
};

const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');

    const span = document.createElement('span');
    span.classList.add('render-container__item-text');
    span.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
        button.addEventListener('click', () => deleteTodo(todo));
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
        button.addEventListener('click', () => completeTodo(todo));
    }

    li.appendChild(span);
    li.appendChild(button);

    return li;
};

todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();