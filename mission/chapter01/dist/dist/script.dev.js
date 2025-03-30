"use strict";

var todoInput = document.getElementById("todo-input");
var todoForm = document.getElementById("todo-form");
var todoList = document.getElementById("todo-list");
var doneList = document.getElementById("done-list");
var todos = [];
var doneTasks = [];

var createTodoElement = function createTodoElement(todo, isDone) {
  var li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;
  var button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
    button.addEventListener("click", function () {
      return deleteTodo(todo);
    });
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
    button.addEventListener("click", function () {
      return completeTodo(todo);
    });
  }

  li.appendChild(button);
  return li;
};

var renderTasks = function renderTasks() {
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

var addTodo = function addTodo(text) {
  todos.push({
    id: Date.now(),
    text: text
  });
  todoInput.value = "";
  renderTasks();
};

var completeTodo = function completeTodo(todo) {
  todos = todos.filter(function (t) {
    return t.id !== todo.id;
  });
  doneTasks.push(todo);
  renderTasks();
};

var deleteTodo = function deleteTodo(todo) {
  doneTasks = doneTasks.filter(function (t) {
    return t.id !== todo.id;
  });
  renderTasks();
};

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var text = todoInput.value.trim();

  if (text) {
    addTodo(text);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  renderTasks();
});