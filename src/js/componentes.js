import { Todo } from "../classes";
import { todoList } from "../index"
// Referencias en HTML
const divTodolist = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnClearcompleted = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const aFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {
    const htmlTodo =
        `
            <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            	<div class="view">
            		<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''} >
            		<label>${todo.tarea}</label>
            		<button class="destroy"></button>
            	</div>
            	<input class="edit" value="Create a TodoMVC template">
            </li> 
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodolist.append(div.firstElementChild);
    pendientes();
    return div;
}


//Eventos:
txtInput.addEventListener('keyup', (event) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        console.log(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        console.log(todoList);
        txtInput.value = '';

    }
    pendientes();
});

divTodolist.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;//Obtiene el nombre del elemento presionado.
    const todoElemento = event.target.parentElement.parentElement;//Obtiene la referencia del elemento en el que se encuentra.
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    } else if (nombreElemento.includes('button')) {//presiono la x para borrar el elemento.

        todoList.eliminarTodo(todoId);
        divTodolist.removeChild(todoElemento);
    }
    // console.log(todoList);
    pendientes();
});

btnClearcompleted.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for (let i = divTodolist.children.length - 1; i >= 0; i--) {

        let elemento = divTodolist.children[i];
        if (elemento.classList.contains('completed')) {
            divTodolist.removeChild(elemento);

        }


    }
    pendientes();

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    console.log(filtro);

    if (!filtro) { return; }

    aFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    for (const elemento of divTodolist.children) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');


        switch (filtro) {

            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }

    }

    pendientes();
});


function pendientes() {

    const contadorTODO = document.querySelector('.todo-count strong');
    let contador = 0;
    for (let i = divTodolist.children.length - 1; i >= 0; i--) {

        let elemento = divTodolist.children[i];
        if (!elemento.classList.contains('completed')) {
            contador++;
        }
    }

    contadorTODO.innerText = (contador);

}