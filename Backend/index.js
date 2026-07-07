const express = require('express');
const path = require("path");
const cors = require('cors');

require('dotenv').config();

const {PORT} = process.env;

const apiRouter = require('./api/main');

const app = express();

app.use(cors());
app.use(express.json());

// directorio publico 
// debe coincidir el nombre del archivo con la url
app.use("/archivos", express.static(path.join(__dirname, 'archivos')))

/*
http://localhost:5000/                -> Cannot GET /
http://localhost:5000/api/            -> Archivo principal de la API
http://localhost:5000/api/alumnos/    -> SELECT db
*/

app.get('/', function(req, res, next){
  res.send("App de express");
});

app.use('/api', apiRouter);

app.listen(PORT, function(error) {
  if (error){
    console.error(error);
    process.exit(1);
  }
  console.log(`Escuchando en el puerto ${PORT}`);
});