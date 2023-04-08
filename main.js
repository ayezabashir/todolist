// selecting elements
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todoListElement = document.getElementById("todos-list");

// saving the todos in array
let todos = [];

let editTodoId = -1;

addToList();
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
        if (editTodoId >= 0) {
            todos = todos.map((todo, index) => {
                if (index === editTodoId) {
                    return {
                        value: todoValue,
                        checked: todo.checked,
                        color: todo.color
                    }

                } else {
                    return {
                        value: todo.value,
                        checked: todo.checked,
                        color: todo.color
                    }
                }
            })
            editTodo = -1;
        } else {
            todos.push({
                value: todoValue,
                checked: false,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            });
        }
        todoInput.value = '';
        // console.log(todos);
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
          data-action="check"
          ></i>
          <p data-action="check">${todo.value}</p>
          <i class="bi bi-pencil-square" data-action="edit"></i>
          <i class="bi bi-trash" data-action="delete"></i>
        </div>
    `
    })
}

// Event Listener on todos
todoListElement.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentElement;

    if (parentElement.className !== "todo") return;

    const todo = parentElement;
    const todoId = Number(todo.id);

    const action = target.dataset.action;

    action === 'check' && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);

})

function editTodo(id) {
    todoInput.value = todos[id].value;
    editTodoId = id;
}

function deleteTodo(id) {
    todos.splice(id, 1);
    editTodoId = -1;
    addToList();
}

function checkTodo(id) {
    todos = todos.map((todo, index) => {
        if (index === id) {
            return {
                value: todo.value,
                color: todo.color,
                checked: !todo.checked
            }
        }
        else {
            return {
                value: todo.value,
                color: todo.color,
                checked: todo.checked
            }
        }
    })

    addToList();
}