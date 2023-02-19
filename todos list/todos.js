const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos"); 

eventListeners();

function eventListeners(){ 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinizden emin misiniz")){
        
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
    })
}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Başarıyla Silindi...");
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todos){
        addTodoToUI(todos);
    });
    
}

function addTodo(e){

    const newTodo = todoInput.value.trim();
    if(newTodo === ""){
        showAlert("danger","Lütfen bir Todo Girin....");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Başarıyla Eklendi...")
    }
    

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout (function(){
        alert.remove();
    },3000);


}

function addTodoToUI(newTodo){

    /*    <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li> */
    // List Item Oluşturma

    // List Item Oluşturma 

    const listItem = document.createElement("li");

    // Link Oluşturma

    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"
    listItem.className = "list-group-item d-flex justify-content-between";
    
    // Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo list'e list item'ı ekleme

    todoList.appendChild(listItem);
    todoInput.value = "";


}