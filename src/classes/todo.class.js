export class Todo{
    constructor(tarea){

        this.tarea = tarea;

        this.id         = new Date().getTime(); //Genera un numero tipo 1315138312 (la fecha con segundos )
        this.completado = false;
        this.creado     = new Date();


    }
}