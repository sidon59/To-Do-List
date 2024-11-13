//loading screen
document.addEventListener("DOMContentLoaded", () => {
    // Set a timeout for 5 seconds to hide the loading screen
    setTimeout(() => {
        // Hide the loading screen
        const loadingScreen = document.getElementById("loading-screen");
        const appContent = document.getElementById("app-content");
        
        if (loadingScreen && appContent) {
            loadingScreen.style.display = "none";
            appContent.style.display = "block";
        }
    }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoForm = document.getElementById("new-todo-form");
    const todoList = document.getElementById("todo-list");

    // Load existing todos from local storage on page load
    displayTodos();

    // Event listener for adding a new todo
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const content = document.getElementById("content").value;
        const category = document.querySelector("input[name='category']:checked");

        if (content && category) {
            const newTodo = {
                content: content,
                category: category.value,
                done: false,
                createdAt: new Date().getTime()
            };

            todos.push(newTodo);
            localStorage.setItem("todos", JSON.stringify(todos)); // Save to local storage
            displayTodos(); // Refresh todo list
            todoForm.reset(); // Clear form input
        } else {
            alert("Please enter a task and select a category.");
        }
    });

    // Function to display all todos in the list
    function displayTodos() {
        todoList.innerHTML = ""; // Clear current list
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");
            if (todo.done) {
                todoItem.classList.add("done");
            }

            // Create inner HTML for each todo item
            todoItem.innerHTML = `
                <label>
                    <input type="checkbox" ${todo.done ? "checked" : ""} data-index="${index}">
                    <span class="bubble ${todo.category}"></span>
                </label>
                <div class="todo-content">
                    <input type="text" value="${todo.content}" readonly>
                </div>
                <div class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;

            // Add event listeners for each todo item
            const checkbox = todoItem.querySelector("input[type='checkbox']");
            const editButton = todoItem.querySelector(".edit");
            const deleteButton = todoItem.querySelector(".delete");

            // Mark as done/undone
            checkbox.addEventListener("change", () => toggleDone(index));

            // Edit task
            editButton.addEventListener("click", () => editTask(index));

            // Delete task
            deleteButton.addEventListener("click", () => deleteTask(index));

            todoList.appendChild(todoItem);
        });
    }

    // Toggle task done status
    function toggleDone(index) {
        todos[index].done = !todos[index].done;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
    }

    // Edit a specific task
    function editTask(index) {
        const todoItem = todoList.children[index];
        const contentInput = todoItem.querySelector(".todo-content input");
        contentInput.removeAttribute("readonly");
        contentInput.focus();
        contentInput.addEventListener("blur", () => {
            todos[index].content = contentInput.value;
            localStorage.setItem("todos", JSON.stringify(todos));
            displayTodos();
        });
    }

    // Delete a specific task
    function deleteTask(index) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
    }

});
