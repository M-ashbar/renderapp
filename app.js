var idCount = 0;
var todos = [];

function addTodo() {
    var inpVal = document.getElementById('inp');

    if (inpVal.value.trim() === "") {
        alert("Todo khaali hai!");
        return;
    }

    todos.push({
        id: idCount,
        title: inpVal.value
    });

    inpVal.value = ""; // Clear the input field after adding
    render();
}

function render() {
    var todoElem = document.getElementById('todos');
    todoElem.innerHTML = "";
    for (var i = 0; i < todos.length; i++) {
        var elem = document.createElement('div');
        var textElem = document.createElement('p');
        var deleteButton = document.createElement('button');
        var updateButton = document.createElement('button');

        deleteButton.textContent = "Delete";
        updateButton.textContent = "Update";
        textElem.textContent = todos[i].title;

        elem.setAttribute("id", todos[i].id);
        deleteButton.setAttribute("onclick", `deleteTodo(${todos[i].id})`);
        updateButton.setAttribute("onclick", `prepareUpdate(${todos[i].id})`);

        elem.appendChild(textElem);
        elem.appendChild(deleteButton);
        elem.appendChild(updateButton);
        todoElem.appendChild(elem);
    }
    idCount++; 
}

function deleteTodo(id) {
    // Remove the todo from the todos array
    todos = todos.filter(todo => todo.id !== id);
    render(); // Re-render the todos
}

function prepareUpdate(id) {
    var inpVal = document.getElementById('inp');
    var todoItem = todos.find(todo => todo.id === id);

    // Set the input value to the current todo title for editing
    inpVal.value = todoItem.title;

    // Change the add button to update button
    var addButton = document.querySelector("button[onclick='addTodo()']");
    addButton.setAttribute("onclick", `updateTodo(${id})`);
    addButton.textContent = "Update Todo";
}

function updateTodo(id) {
    var inpVal = document.getElementById('inp');

    if (inpVal.value.trim() === "") {
        alert("Updated Todo khaali hai!");
        return;
    }

    // Update the todo in the todos array
    var todoItem = todos.find(todo => todo.id === id);
    todoItem.title = inpVal.value;

    // Reset the input field and button
    inpVal.value = "";
    var addButton = document.querySelector("button[onclick^='updateTodo']");
    addButton.setAttribute("onclick", `addTodo()`);
    addButton.textContent = "Add Todo !";

    render(); // Re-render the todos
}