const express = require('express');
const listEditRouter = express.Router();

//middleware para solicitudes vacias
const postVacio =(req,res,next)=>{
    if (req.method === "POST"  && (!req.body || Object.keys(req.body).length === 0)){
        res.status(400).json({
            error : 'faltan parametros en la solicitud'}) 
        } else{
        next();
    }
}

//middleware solicitudes POST que tengan información no valida o atributos faltantes para crear las tareas
const postInvalid = (req,res,next)=>{
    const {indicador,descripcion} = req.body;
    if (!indicador || !descripcion) {
        res.status(400).json({erro: 'se pusieron valores incorrectos o invalidos'})
    } else{
        next();
    }
};

const putVacio = (req,res,next)=>{
    if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
        res.status(400).json({error: 'Solicitud vacia'})
    } else {
        next();
    }
};

const putInvalid = (req, res,next)=>{
    const {newDescripcion} = req.body;
    if (!newDescripcion) {
        res.status(400).json({error: 'Valores incorrectos'})
    }else{
        next();
    }
};
 
listEditRouter.post('/agregar', postInvalid, postVacio,(req, res) => {
    const {Tareas} = require("../principal");
    const { indicador, descripcion } = req.body;
    if (!indicador, descripcion){
        const newTask = { indicador, descripcion, completado: false };
        Tareas.push(newTask);
        res.status(200).json(newTask);
    } else {
                res.status(400).json({error: "Faltan elementos para poder crear la tarea"})

    }
});

listEditRouter.delete('/delete', (req, res) => {
    const {Tareas} = require("../principal");
    const { indicador } = req.body;
    const findTarea = Tareas.findIndex(tarea => tarea.indicador === indicador);
    if (findTarea !== -1) {
        Tareas.splice(findTarea, 1);
        res.status(200).json({ mensaje: "Tarea eliminada" });
    } else {
        res.status(400).json({ error: `La tarea con indicador ${indicador} no fue encontrada` });
    }
});
listEditRouter.put('/actualizar/:indicador', putVacio, (req, res) => {
    const {Tareas} = require("../principal");
    const {indicador} = req.params;
    const {newDescripcion} = req.body;
    const tareaIndex = Tareas.findIndex(tarea => tarea.indicador === indicador);
    if (tareaIndex) {
        tareaIndex.descripcion = newDescripcion;
        res.json({ mensaje: 'Tarea actualizada exitosamente' });
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});
module.exports = listEditRouter;