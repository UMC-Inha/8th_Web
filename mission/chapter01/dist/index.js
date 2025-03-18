"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");
    const completedList = document.getElementById("completedList");
    function createTask(task, completed) {
        const item = document.createElement("li");
        item.textContent = task;
        const btn = document.createElement("button");
        if (completed) {
            btn.textContent = "삭제";
            btn.classList.add("delete");
            btn.onclick = function () {
                item.remove();
            };
        }
        else {
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
    function addTask() {
        if (input.value.trim() !== "") {
            const task = createTask(input.value.trim(), false);
            todoList.appendChild(task);
            input.value = "";
        }
    }
    addBtn.addEventListener("click", addTask);
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
});
