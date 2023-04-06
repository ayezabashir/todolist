// selecting elements
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todoListElement = document.getElementById("todos-list");

// saving the todos in array
const todos = [];

// form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveToDo();
    addToList();
})

// function to add todo
function saveToDo() {
    const todoValue = todoInput.value;
    const isEmpty = todoValue === "";
    const isDuplicate = todos.some(
        (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
    );

    if (isEmpty) {
        alert('empty value can not be added');
    } else if (isDuplicate) {
        alert('duplicates cannot be added');
    }
    else {
        const todo = {
            value: todoValue,
            checked: false,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        }
        todos.push(todo);
        todoInput.value = '';
        console.log(todos);
    }
}

// Rendering to do to user interface
function addToList() {
    // clearing element before re-rendering
    todoListElement.innerHTML = '';

    // rendering elements
    todos.forEach((todo, index) => {

        todoListElement.innerHTML += `
        <div class="todo" id=${index}>
          <i 
          class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
          style = "color: ${todo.color}"
          ></i>
          <p>${todo.value}</p>
          <i class="bi bi-pencil-square"></i>
          <i class="bi bi-trash"></i>
        </div>
    `
    })
}