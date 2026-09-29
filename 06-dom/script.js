// Day 6 - DOM & Events

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const emptyMessage = document.getElementById("empty-message");
const errorMessage = document.getElementById("error-message");

// Update the task counter and empty state.
function updateTaskInfo() {
    const tasks = taskList.querySelectorAll(".task-item");
    const completedTasks = taskList.querySelectorAll(".task-item.completed");

    taskCount.textContent =
        `${tasks.length} task${tasks.length === 1 ? "" : "s"} • ${completedTasks.length} completed`;

    emptyMessage.hidden = tasks.length > 0;
}

// Create a new task element.
function createTask(taskText) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Complete: ${taskText}`);

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    // Click event: mark task as completed.
    checkbox.addEventListener("change", function () {
        taskItem.classList.toggle("completed", checkbox.checked);
        updateTaskInfo();
    });

    // Click event: remove task.
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
        updateTaskInfo();
    });

    taskItem.append(checkbox, text, deleteButton);
    taskList.appendChild(taskItem);

    updateTaskInfo();
}

// Submit event: add a new task.
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task.";
        taskInput.focus();
        return;
    }

    errorMessage.textContent = "";
    createTask(taskText);

    taskInput.value = "";
    taskInput.focus();
});

updateTaskInfo();
