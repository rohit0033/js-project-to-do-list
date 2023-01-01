// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);



//Functions

function addtodo(event){
    // Prevent  form from sumbitting
    event.preventDefault();

    // Todo div instead of crating in html we creating in javascript only
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo");

    //create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add to do local storage
    saveLoacalTodos(todoInput.value);

    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // check trash Button

    const trashButton= document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    

    // Append to list 
    todoList.appendChild(todoDiv);

    // clear todo Input value
    todoInput.value = "";


}


function deleteCheck(e){
    const item =e.target;
    if( item.classList[0]=== "trash-btn"){
        const todo = item.parentElement;
        // Animation 
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();


        });
        
    }

    // check mark
    if( item.classList[0]=== "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e){
    const todos =todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display ="flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display ="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display ="flex";
                }else{
                    todo.style.display ="none";
                }
                break;
        }
    });
}

function saveLoacalTodos(todo){
    //check -- hey do i have already thigs there
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    //check -- hey do i have already thigs there
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    // Todo div instead of crating in html we creating in javascript only
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo");

    //create Li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);


    // Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // check trash Button

    const trashButton= document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    

    // Append to list 
    todoList.appendChild(todoDiv);

    });
    
}

function removeLocalTodos(todo){
    //check -- hey do i have already thigs there
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoIndex  =todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}