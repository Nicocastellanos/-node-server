//declaro el readline que me ayudara mas adelante para que el usuario pueda interactuar con el programa
const readline = require('readline-sync');
//declare un array vacio ya que este se ira llenando o vaciando dependiendo de la accion que se decida realizar
let listaDeTrareas = [];
const serverNew = function (req, res) {
    const url = new URL(req.url, 'http://localhost:9000/');
    res.writeHead({ 'Content-Type': 'text/plain' });
    res.end();
}
const server = http.createServer(serverNew);
server.listen(port, host, () => {
    console.log('Servidor en linea');
});

//agregue la funcion de agregar una tarea con parametros de indicador y descripcion. para luego mandar la info al array vacio
function agregarTarea(indicador, descripcion) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            listaDeTrareas.push({
            indicador, descripcion, completada: false});
            console.log('tarea agregada: ' + indicador + ' - ' + descripcion);
            resolve();
        }, 3000);
       
    }); 
};
//agregue la funcion de eliminar tarea 
function eliminarTarea(indicador) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
    const findTarea = listaDeTrareas.findIndex(tarea => tarea.indicador === indicador);
    if (findTarea !== -1) {
        listaDeTrareas.splice(findTarea, 1);
       resolve(console.log('Tarea eliminada ' + indicador));
    } else {
        reject(console.log('No se encontro la tarea con indicador: ' + indicador));
    }
        }, 3000);
    });
    //use el find para encontrar en el array una tarea que cumpla con la condicion 
   
};
//agregue la funcion de completar una tarea
function tareaCompletada(indicador) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
    const tarea = listaDeTrareas.find(tarea => tarea.indicador === indicador);
    if (tarea) {
        tarea.completada = true;
       resolve(console.log('La tarea ' + indicador + ' a sido completada: '));
    } else {
        reject(console.log('La tarea no se ha encontrado: ' + indicador));
    } 
        }, 3000);
    });
    //aca busco la tarea que deseo completar
   
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
async function menu() {
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
            const opcion = await readline.question('Elije una opcion: ');
            //utilice un switch para la serie de opciones que puse y por cada opcion ocurre algo diferente 
            switch (opcion) {
                case '1':
                    try{
                    const indicador = await readline.question('Indicador de la nueva tarea: ');
                    const descripcion = await readline.question('Descripcion de la nueva tarea: ');
                        await agregarTarea(indicador, descripcion);
                    }catch(error) {
                     console.log('error ' +error);   
                    }
                    break;
                case '2':
                    try {
                        const indicadorAElinimar = await readline.question('Indicador de la tarea que se desea eliminar: ');
                        await eliminarTarea(indicadorAElinimar);
                    } catch (error) {
                        console.log('error '+error);
                    }
                    break;
                case '3':
                    try {
                        const tareaCompletar = await readline.question('Indicador de la tarea que se desea completar: ');
                        await tareaCompletada(tareaCompletar);
                    } catch (error) {
                        console.log('error '+error);
                    }
                    break;
                case '4':
                   await mostrarTareas();
                    break;
                case '5':
                    await console.log('Adios :,c');
                    return;
                default:
                    await console.log('Esa opcion no esta en el menu prueba nuevamente');
            }
        }
    } 
//llame la funcion menu para poder veer el menu 
menu();

