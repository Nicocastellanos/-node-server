const express = require('express');
const listViewRouter = express.Router();
listViewRouter.get('/completeTask', (req, res) => {
    const { listaDeTrareas } = require("./listaTareas")
    const taskComplete = listaDeTrareas.filter(
        (tarea) => tarea.estado === true
    );
    res.json(taskComplete);
    res.end()
});
listViewRouter.get('/incompleteTask', (req, res) => {
    const {listaDeTrareas} = require("./listaTareas")
    const taskIncomplete = listaDeTrareas.filter(
        (tarea) => tarea.estado === false
    );
    res.json(taskIncomplete);
    res.end()
});
module.exports = listViewRouter;