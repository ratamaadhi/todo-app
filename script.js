const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

const listTodos = JSON.parse(localStorage.getItem('list'));

if(listTodos){
    listTodos.forEach((todo)=>{
        addTodo(todo);
    });
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    addTodo();
});

function addTodo(todo){
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const listEl = document.createElement('li');
        
        if (todo && todo.completed) {
            listEl.classList.add('completed');
        }
        
        listEl.innerText = todoText;

        listEl.addEventListener('click', () => {
            listEl.classList.toggle('completed');
            updateLS();
        });

        listEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            listEl.remove();
            updateLS();
        });

        list.appendChild(listEl);

        input.value =  '';
        updateLS();
    }
}

function updateLS(){
    const listTodoEl = document.querySelectorAll('li');

    const listTodo = [];

    listTodoEl.forEach((listTodoEl)=>{
        listTodo.push({
            text: listTodoEl.innerText,
            completed: listTodoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('list',JSON.stringify(listTodo));
}