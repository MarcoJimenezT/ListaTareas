import { Tarea } from ".";

export class ListaDeTareas{
    
    constructor(){
        //this.liTareas=[];
        this.cargarLocalStorage();
    }
    
    nuevaTarea(tarea){
        this.liTareas.push(tarea);
        this.guardarLocalStorage();
    }
    eliminarTarea(id){
        this.liTareas = this.liTareas.filter(tarea => tarea.id !=id)
        //ESta funcion que fue implementada (filter) es para regresar un nuevo arreglo excluyendo a la tarea que coincida con el id que se obtuvo
        this.guardarLocalStorage();
    }
    marcarCompletado(id){
        for(const tarea of this.liTareas){
            if(tarea.id == id){
                tarea.estado = !tarea.estado;
                this.guardarLocalStorage();
                break;
            }
        }

    }
    eliminarCompletados(){
        this.liTareas = this.liTareas.filter(tarea => !tarea.estado)
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('Tarea',JSON.stringify(this.liTareas)) // Se genera un JSON el cual va a convertir el valor de ---------------------------------------------------------------(this.liTareas) a cadenas de texto
    }
    cargarLocalStorage(){
        this.liTareas = (localStorage.getItem('Tarea'))
                            ? JSON.parse(localStorage.getItem('Tarea'))
                            : [];
        this.liTareas = this.liTareas.map(Tarea.fromJson);
        
    }
}