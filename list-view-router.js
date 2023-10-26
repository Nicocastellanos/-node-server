const express = require('express');
const listViewRouter = express.Router();



listViewRouter.get('/completeTask', (req, res) => {
    const {Tareas} = require("./principal");
     const taskComplete = Tareas.filter(
        (tarea) => tarea.completada === true
    );
    res.json(taskComplete);
});

     listViewRouter.get('/incompleteTask', (req, res) => {
        const {Tareas} = require("./principal");
     const taskIncomplete = Tareas.filter(
             (tarea) => tarea.completada === false
        );
         res.json(taskIncomplete);
    });


module.exports = listViewRouter;