document.addEventListener("DOMContentLoaded", () => {
    // Retrieve todos from localStorage or set an empty array if none exist
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // References to elements
    const nameInput = document.getElementById("name");
    const todoForm = document.getElementById("new-todo-form");
    const todoList = document.getElementById("todo-list");

    // Load and display the stored username
    nameInput.value = localStorage.getItem("username") || '';
    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("username", e.target.value);
    });

    // Event listener for adding a new todo
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const content = document.getElementById("content").value;
        const category = document.querySelector("input[name='category']:checked");

        if (content && category) {
            const todo = {
                content,
                category: category.value,
                done: false,
                createdAt: new Date().getTime()
            };
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));

            document.getElementById("content").value = ""; // Clear input
            displayTodos(); // Refresh todo list display
        } else {
            alert("Please enter a task and select a category.");
        }
    });

    // Function to display all todos in the list
    function displayTodos() {
        todoList.innerHTML = ""; // Clear the current list

        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");

            const label = document.createElement("label");
            const input = document.createElement("input");
            const span = document.createElement("span");
            const content = document.createElement("div");
            const actions = document.createElement("div");
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            // Checkbox for completion status
            input.type = "checkbox";
            input.checked = todo.done;
            input.addEventListener("change", () => toggleDone(todo, todoItem));

            // Style the category bubble
            span.classList.add("bubble", todo.category === "personal" ? "personal" : "business");

            // Set up content and actions
            content.classList.add("todo-content");
            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            actions.classList.add("actions");
            editButton.classList.add("edit");
            editButton.innerText = "Edit";
            deleteButton.classList.add("delete");
            deleteButton.innerText = "Delete";

            // Append elements to the todo item
            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(editButton);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            // Add to list
            todoList.appendChild(todoItem);

            // Event listeners for editing and deleting
            editButton.addEventListener("click", () => editTodo(todo, content));
            deleteButton.addEventListener("click", () => deleteTodo(index));

            // Add class if marked as done
            if (todo.done) {
                todoItem.classList.add("done");
            }
        });
    }

    // Function to toggle completion status
    function toggleDone(todo, todoItem) {
        todo.done = !todo.done;
        localStorage.setItem("todos", JSON.stringify(todos));
        todoItem.classList.toggle("done");
        displayTodos();
    }

    // Function to edit a todo item
    function editTodo(todo, content) {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", () => {
            input.setAttribute("readonly", true);
            todo.content = input.value;
            localStorage.setItem("todos", JSON.stringify(todos));
            displayTodos();
        });
    }

    // Function to delete a todo item
    function deleteTodo(index) {
        todos.splice(index, 1); // Remove the item from the array
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
    }

    // Display todos on page load
    displayTodos();
});
