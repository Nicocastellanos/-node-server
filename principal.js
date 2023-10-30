
const express = require('express');
const app = express();
const port = 8080;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const listViewRouter = require('./src/routes/list-view-router');
const listEditRouter = require('./src/routes/list-edit-router');

app.use(express.json());
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);
app.use(metodos);

const secretKey = process.env.SECRET_KEY;

app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost: ${port}`);
});

const usuarios = [
    {username : "usuario1", password : "password1"},
    {username : "usuario2", password: "password2"}
]

app.post('/login', (req,res)=>{
   const {username,password} = req.body;
   const usuario = usuarios.find((user) => user.username === username || user.password === password);
   if (!usuario) {
    res.status(401).json({error: 'usuario o contraseña invalidos'})
   }
const token = jwt.sign({username}, secretKey, {expiresIn:'30min'});
res.json(token);
});

//MD para verificar el token
function MD_verifyToken(req,res,next) {
    const token = req.get("Authorization")
    if (!token) {
        res.status(401).json({error: 'Token no valido'})
        return;
    }
    const tokenBearer = token.replace("Bearer ", "");

    jwt.verify(tokenBearer, secretKey, (error, decoded) => {
    if (error) {
      res.status(401).json({ error: 'Token invalido' });
      return;
    }
    req.user = decoded; 
    next();
 });
}

app.get('/rutasegura',MD_verifyToken,(req,res)=>{
    res.status(200).json({msg:'ruta segura'})
})


function metodos(req,res,next) {
    const metodosValidos = ['GET','PUT','DELETE', 'POST']
    if (!metodosValidos.includes(req.method)) {
        res.status(405).json({error: 'ese metodo no es valido'})
    }else{
        next();
    }
}



const Tareas = [
    { indicador: 2, descripcion: "blablabla", completada: false },
    { indicador: 3, descripcion: "wgweew", completada: true },
];

module.exports = {Tareas};



