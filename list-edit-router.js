const express = require('express');
const listEditRouter = express.Router();

listEditRouter.post('/agregar', (req, res) => {
    const {Tareas} = require("./principal");
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
    const {Tareas} = require("./principal");
    const { indicador } = req.body;
    const findTarea = Tareas.findIndex(tarea => tarea.indicador === indicador);
    if (findTarea !== -1) {
        Tareas.splice(findTarea, 1);
        res.status(200).json({ mensaje: "Tarea eliminada" });
    } else {
        res.status(400).json({ error: `La tarea con indicador ${indicador} no fue encontrada` });
    }
});
listEditRouter.put('/actualizar/:indicador', (req, res) => {
    const {Tareas} = require("./principal");
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