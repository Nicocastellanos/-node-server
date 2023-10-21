
const express = require('express');
const app = express();
const port = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', (req,res)=>{
    res.json(Tareas);
    res.end();
});

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost: ${port}`);
});

app.get('/', (req,res)=>{
    res.write('Servidor funcionando')
    res.end()
});

const Tareas = [
    { indicador: 2, descripcion: "blablabla", completada: false },
    { indicador: 3, descripcion: "wgweew", completada: true },
];

module.exports = {Tareas};



