const express = require('express');
const listViewRouter = express.Router();

listViewRouter.get('/completeTask', (req, res) => {
    const {tareas} = require("../principal");
     const taskComplete = tareas.filter((tarea) => tarea.completada === true);
    res.json(taskComplete);
});

     listViewRouter.get('/incompleteTask', (req, res) => {
        const {tareas} = require("../principal");
     const taskIncomplete = tareas.filter((tarea) => tarea.completada === false);
         res.json(taskIncomplete);
    });

module.exports = listViewRouter;