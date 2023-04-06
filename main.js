const form = document.getElementById("todoform");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit");
})