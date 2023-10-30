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
        res.status(400).json({error: 'se pusieron valores incorrectos o invalidos'})
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

//middleware para put invalido
const putInvalid = (req, res,next)=>{
    const {newDescripcion} = req.body;
    if (!newDescripcion) {
        res.status(400).json({error: 'Valores incorrectos'})
    }else{
        next();
    }
};

listEditRouter.get('/tasks', (req,res)=>{
    const {tareas} = require ("../principal")
    res.json(tareas);
    res.end();
})

//endpoint para ver una sola tarea
listEditRouter.get('/task/:indicador', (req,res)=>{
    const {tareas} = require("../principal.js")
    const {indicador} = req.params.indicador;
    const indexTarea = tareas.find((tarea) => tarea.indicador === indicador)
    if (!indexTarea) {
        res.status(401).json({msg : `tarea con el indicador "${indicador}" no encontrada`})
    } else{
        res.status(201).json(indexTarea);
    }
})

//endpoint para agregar tarea
listEditRouter.post('/agregar', postInvalid, postVacio,(req, res) => {
    const {tareas} = require("../principal.js");
    const { indicador, descripcion } = req.body;
    const sameIndicador = tareas.find(tarea => tarea.indicador === indicador);

    if(sameIndicador){
        res.status(400).json({ error: `Ya existe una tarea con el indicador ${indicador}`})
    }else{
        const newTarea = { indicador , descripcion, completed: false};
        tareas.push(newTarea);
        res.status(201).json(newTarea);
    }
});

//endpoint para borrar tarea
listEditRouter.delete('/delete/:indicador', (req, res) => {
    const {tareas} = require("../principal.js");
    const { indicador } = req.params;
    const findTarea = tareas.findIndex(tarea => tarea.indicador === indicador);

    if (findTarea!== 1) {
     tareas.splice(tareas,1)
     res.status(200).json({ msg : `tarea con el indicador ${indicador} fue eliminada`})
    } else {
       res.status(404).json({msg: `tarea con el indicador ${indicador} no fue encontrada`})
    }
});
//endpoint para actualizar una tarea
listEditRouter.put('/actualizar/:indicador', putVacio, putInvalid, (req, res) => {
    const {tareas} = require("../principal.js");
    const {indicador} = req.params;
    const {newDescripcion} = req.body;
    const tareaIndex = tareas.findIndex(tarea => tarea.indicador === indicador);

    if (tareaIndex) {
        tareaIndex.descripcion = newDescripcion;
        res.json({ mensaje: 'Tarea actualizada exitosamente' });
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

module.exports = listEditRouter;