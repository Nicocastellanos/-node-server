const express = require('express');
const listEditRouter = express.Router();
listEditRouter.post('/agregar', (req, res) => {
    const { listaDeTareas } = require("./listaTareas");
    const {indicador,descripcion} = req.body; 
       if (indicador || descripcion) {
           res.status(400).json((error));
       } else {
           const newTask = { indicador, descripcion, completado: false }
           listaDeTareas.push(newTask);
           res.status(200).json(newTask)
       }
       res.end()
});

listEditRouter.delete('/delete', (req, res) => {
    const findTarea = listaDeTrareas.findIndex(tarea => tarea.indicador === indicador);
    if (findTarea !== -1) {
        listaDeTrareas.splice(findTarea, 1);
        res.status(200).json(listaDeTrareas, "tarea eliminada");
    } else {
        res.status(400).json(Error, `la tarea con indicador ${indicador} no fue encontrada`);
    }
    res.end()
})
listEditRouter.put('/actualizar/:id', (req, res) => {
    const tareaId = parseInt(req.params.id);
    const tareaIndex = listaDeTareas.findIndex((tarea) => tarea.id === tareaId);
    if (tareaIndex !== -1) {
        const tareaActualizada = req.body;
        listaDeTareas[tareaIndex] = tareaActualizada;
        res.json({ mensaje: 'Tarea actualizada exitosamente' });
    } else {
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.end()
});
module.exports = listEditRouter;