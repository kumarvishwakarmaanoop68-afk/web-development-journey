// Day 7 - JavaScript Project

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const emptyMessage = document.getElementById("empty-message");

const totalCount = document.getElementById("total-count");
const activeCount = document.getElementById("active-count");
const completedCount = document.getElementById("completed-count");

const filterButtons = document.querySelectorAll(".filter");
const clearCompletedButton = document.getElementById("clear-completed");

const STORAGE_KEY = "day7-smart-todo-tasks";

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        console.error("Could not load tasks:", error);
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(text) {
    return {
        id: Date.now() + Math.random(),
        text: text,
        completed: false
    };
}

function getVisibleTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function updateStats() {
    const completed = tasks.filter(task => task.completed).length;
    const active = tasks.length - completed;

    totalCount.textContent = tasks.length;
    activeCount.textContent = active;
    completedCount.textContent = completed;
}

function renderTasks() {
    taskList.innerHTML = "";

    const visibleTasks = getVisibleTasks();

    visibleTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Complete: ${task.text}`);

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    emptyMessage.hidden = visibleTasks.length > 0;
    updateStats();
}

function addTask(text) {
    tasks.push(createTask(text));
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        errorMessage.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    errorMessage.textContent = "";
    addTask(text);

    taskInput.value = "";
    taskInput.focus();
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        renderTasks();
    });
});

clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
