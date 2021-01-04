import './styles.css';

import {Tarea,ListaDeTareas} from './classes'
import {crearHtml} from './js/componentes'

export const todasTareas = new ListaDeTareas();//Se obtienen todas las tareas guardadas

todasTareas.liTareas.forEach(crearHtml); //Funcion corta de la funcion de abajo eficiente solo si se esta retornando un     -------------------------------------------argumento el forEach

// todasTareas.liTareas.forEach(tarea => crearHtml(tarea));
//Esta funcion es mas eficiente que la de arriba solo si se va a enviar mas de 1 un valor a la funcion de crearHtml 

// const tarea = new Tareas('Agendar cita con el Doctor');
// todasTareas.nuevaTarea(tarea);
// crearHtml(tarea);
// console.log(todasTareas)