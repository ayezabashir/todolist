// selecting elements
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");

// saving the todos in array
const todos = [];

// form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    saveToDo();
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