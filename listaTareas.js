//declaro el readline que me ayudara mas adelante para que el usuario pueda interactuar con el programa
const readline = require('readline-sync');
//declare un array vacio ya que este se ira llenando o vaciando dependiendo de la accion que se decida realizar
const listaDeTrareas = [];
//agregue la funcion de agregar una tarea con parametros de indicador y descripcion. para luego mandar la info al array vacio
function agregarTarea(indicador, descripcion) {
    listaDeTrareas.push({
        indicador, descripcion, completada: false
    });
    console.log('tarea agregada: ' + indicador + ' - ' + descripcion);
};
//agregue la funcion de eliminar tarea 
function eliminarTarea(indicador) {
    //use el find para encontrar en el array una tarea que cumpla con la condicion 
    const findTarea = listaDeTrareas.findIndex(tarea => tarea.indicador === indicador);
    if (findTarea !== -1) {
        listaDeTrareas.splice(findTarea, 1);
        console.log('Tarea eliminada ' + indicador);
    } else {
        console.log('No se encontro la tarea con indicador: ' + indicador);
    }
};
//agregue la funcion de completar una tarea
function tareaCompletada(indicador) {
    //aca busco la tarea que deseo completar
    const tarea = listaDeTrareas.find(tarea => tarea.indicador === indicador);
    if (tarea) {
        tarea.completada = true;
        console.log('La tarea ' + indicador + ' a sido completada: ');
    } else {
        console.log('La tarea no se ha encontrado: ' + indicador);
    }
};
//agregue un funcion que me permite ver las tareas que he agregado en el array
function mostrarTareas() {
    console.log('lista de tareas');
    listaDeTrareas.forEach((tarea) => {
        const estado = tarea.completada ? 'Completada' : 'Pendiente'
        console.log(+tarea.indicador + ' - ' + tarea.descripcion + ' - ' + estado);
    });
};
//agregue la funcion que me permite ver un menu y elejir una opcion
function menu() {
    console.log('Menu de opciones');
    //agregue un while para el menu se puede repetir mas de una vez, asi no se tenga que iniciar el programa cada vez que termine una accion
    while (true) {
        console.log('Opciones');
        console.log('1. Agregar tarea');
        console.log('2. Eliminar tarea');
        console.log('3. completar tarea');
        console.log('4. Mostrar tareas');
        console.log('5. Salir');
        //aca permito que el usuario elija una de las opciones y pueda realizar una accion
        const opcion = readline.question('Elije una opcion: ');
        //utilice un switch para la serie de opciones que puse y por cada opcion ocurre algo diferente 
        switch (opcion) {
            case '1':
                const indicador = readline.question('Indicador de la nueva tarea: ');
                const descripcion = readline.question('Descripcion de la nueva tarea: ');
                agregarTarea(indicador, descripcion);
                break;
            case '2':
                const indicadorAElinimar = readline.question('Indicador de la tarea que se desea eliminar: ');
                eliminarTarea(indicadorAElinimar);
                break;
            case '3':
                const tareaCompletar = readline.question('Indicador de la tarea que se desea completar: ');
                tareaCompletada(tareaCompletar);
                break;
            case '4':
                mostrarTareas();
                break;
            case '5':
                console.log('Adios :,c');
                return;
            default:
                console.log('Esa opcion no esta en el menu prueba nuevamente');
        }
    }
}
//llame la funcion menu para poder veer el menu 
menu();