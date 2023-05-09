// Selectors
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoList = document.getElementById("todo-list");
const filterOption = document.getElementById("filter-todo");
const message = document.getElementById("message");

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", (event) => {
    // Prevent Form From Submitting
    event.preventDefault();
    // Hide Welcome Message
    message.style.display = "none";
    // Create Todo
    addTodo(todoInput.value);
    // Add Todo to Local Storage
    saveLocalTodos(todoInput.value);
    // Clear Todo Input value
    todoInput.value = "";
});
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// Functions
// Add Todos
function addTodo(text) {
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = text;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Apend To List
    todoList.appendChild(todoDiv);
}

// Delete or Complete Todos
function deleteCheck(e) {
    const item = e.target;
    // Delete TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    // Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// Filter
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

// Local Storage
function saveLocalTodos(todo) {
    // Check if used
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // Push list
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    // Check if used
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
        // Update message for first time use
        message.innerText = "Start by adding a new Todo to the list!";
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        if (todos.length == 0) {
            // Update message for welcome
            message.innerText = "Plan your day by creating new Todos!";
        } else {
            message.style.display = "none";
        }
    }
    // Add to UI
    todos.forEach(addTodo);
}

function removeLocalTodos(todo) {
    // Check if used
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}