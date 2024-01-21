let todoInput = document.querySelector(".input");
let addBtn = document.querySelector(".button");
let showTodos = document.querySelector(".todos-container");


let todo;
let localData = JSON.parse(localStorage.getItem("todos"))
let todoList = localData || [];


// Function to generate randome Id:
var generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
              v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function render todoList
var renderTodos = (todoList) => {
    console.log(todoList)
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class = "todo relative"><input class = "t-checkbox t-pointer" id = "item-${id}" type = "checkbox" data-key = "${id}" ${isCompleted ? "checked" : ""}/><label for = "item-${id}" class = "todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key = "${id}">${todo}</label><button class = "absolute right-0 button cursor"><span data-todokey=${id}  class="del-btn material-icons-outlined">delete</button></div>`)
}

showTodos.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    let delTodokey  = e.target.dataset.todokey
    todoList = todoList.map((todo) =>
        todo.id === key ? {
            ...todo,
            isCompleted: !todo.isCompleted
        } : todo
    );
    todoList = todoList.filter(todo => todo.id != delTodokey)
    renderTodos(todoList)
    localStorage.setItem("todos", JSON.stringify(todoList))
    console.log(todoList)
})

addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    todo = todoInput.value;
    if(todo.length > 0){
        todoList.push(
            {
                id : generateUuid(),
                todo,
                isCompleted : false
            }
        )
    }
    localStorage.setItem("todos", JSON.stringify(todoList))
    renderTodos(todoList)
    todoInput.value = ""
    
})

renderTodos(todoList)


