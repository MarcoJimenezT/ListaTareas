import '../css/componentes.css';
import { ListaDeTareas, Tarea } from '../classes/';
import { todasTareas } from '../index';//Se obtene un arreglo con todas las tareas existentes
//----------------------------------------------Referencias HTML
const divTarea = document.querySelector('.todo-list');
const capturaTarea = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const ancoreFiltros = document.querySelectorAll('.filtro');
//---------------------------------------------Funciones

export const crearHtml = (tarea) => {
    const htmlTareas = `
    <li class="${(tarea.estado) ? 'completed' : ''}" data-id="${tarea.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(tarea.estado) ? 'checked' : ''}>
				<label>${tarea.tarea}</label>
				<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement('div');
    div.innerHTML = htmlTareas;
    divTarea.append(div.firstElementChild);

    return div.firstElementChild;
}
//---------------------------------------------Eventos

capturaTarea.addEventListener('keyup', (event) => { //Se requiere el event porque se va a personalizar la ubicacion del -----------------------------------------------------evento
    if (event.key == 'Enter' && capturaTarea.value.length > 0) { // Si se presiono la tecla enter y si el campo no esta vacio
        const nTarea = new Tarea(capturaTarea.value);
        todasTareas.nuevaTarea(nTarea)

        crearHtml(nTarea);
        capturaTarea.value = '';
    }
})
divTarea.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const elementoTarea = event.target.parentElement.parentElement;
    const obtenerIdTarea = elementoTarea.getAttribute('data-id')
    if (nombreElemento.includes('input')) {
        todasTareas.marcarCompletado(obtenerIdTarea);
        elementoTarea.classList.toggle('completed')// toggle es para crear si no existe y destruir si existe dicha clase
    } else if (nombreElemento.includes('button')) {
        todasTareas.eliminarTarea(obtenerIdTarea)
        divTarea.removeChild(elementoTarea)
    }

})
borrarCompletados.addEventListener('click', () => {
    todasTareas.eliminarCompletados()//Se eliminan las tareas del arrelgo de la lista de tareas
    for (let i = divTarea.children.length - 1; i >= 0; i--) {
        const elemento = divTarea.children[i]; //Se almacena la tarea numero N de las tareas mostradas en pantalla
        console.log(elemento)
        if(elemento.classList.contains('completed')){ // Si la tarea contiene la clase completed
            divTarea.removeChild(elemento)// Se remueve la tarea de las tareas mostradas en pantalla
        }
    }
})
ulFiltros.addEventListener('click', (event)=>{
    const filtro = event.target.text;
    if(!filtro) return;

    ancoreFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTarea.children){
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
        
            case 'Completados':
                if(!completado){
                    elemento.classList.remove('hidden');
                    if(!elemento.classList.contains('completed')){
                        elemento.classList.add('hidden')
                    }
                }
                break;
        }
    }
})