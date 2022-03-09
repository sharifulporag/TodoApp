const inputText = document.getElementById("text");
const addBtn = document.getElementById("addText");
const todosOutput = document.querySelector(".wrapper_card");
// const cardContent = document.querySelectorAll(".creat-card-content h4");
// const editBtn = document.getElementById("editBtn");
// const deleteBtn = document.getElementById("deleteBtn");
// for add todo function
const getTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    let allTodos = ''
    todos.forEach((todo, index) => {
        const newTodo = `
            <div class="creat-card-section">
                <div class="creat-card-content">
                    <h4>${todo.text}</h4>
                </div>
                <div class="btn">
                    <i class="fa-solid fa-pen-to-square editBtn" data-id=${index}></i>
                    <i class="fa-solid fa-trash-can deleteBtn" data-id=${index}></i>
                </div>
            </div>
        `

        allTodos += newTodo


    });
    todosOutput.innerHTML = allTodos;
}


const addTodo = (text) => {
    if (text) {
        //    

        let oldTodos = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : [];

        // oldTodos.push({ text })

        localStorage.setItem('todos', JSON.stringify([...oldTodos, { text }]))



        inputText.value = "";
        inputText.focus();
        getTodos()
    }
}
addBtn.addEventListener("click", () => addTodo(inputText.value))

// now click to end of work section
todosOutput.addEventListener("click", (e) => {
    if (e.target.nodeName === "H4") {
        e.target.classList.toggle("work_done")
    }

    if (e.target.classList.contains("deleteBtn")) {
        const id = e.target.getAttribute('data-id');
        let allTodos1 = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []
        allTodos1.splice(Number(id), 1)
        localStorage.setItem('todos', JSON.stringify(allTodos1))
        getTodos()
    }
    if (e.target.classList.contains("editBtn")) {

        const editedTodo = editTodo(e.target.parentElement.parentElement.innerText);
        const id = e.target.getAttribute('data-id');

        let allTodos1 = JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []

        allTodos1.splice(Number(id), 1, { text: editedTodo })

        localStorage.setItem('todos', JSON.stringify(allTodos1))
        getTodos()
    }
})

// here edit todo section work
const editTodo = (text) => {
    let newTodo = prompt("Edit todo", text.trim())
    if (newTodo) {
        return newTodo
    } else {
        newTodo = prompt("Edit todo", text.trim())
    }
}

getTodos()