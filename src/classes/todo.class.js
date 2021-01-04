export class Tarea{
    static fromJson({id,tarea,estado,creado}){ // Funcion para recuperar las funciones de la clase
        const tempTarea = new Tarea(tarea);

        tempTarea.id = id;
        tempTarea.estado = estado;
        tempTarea.creado = creado;

        return tempTarea;
    }
    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.estado = false;
        this.creado = new Date();
    }
}