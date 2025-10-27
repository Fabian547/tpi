const router = require('express').Router();

const middleware = require('./middleware');

const equiposrouter = require('./equipos/main');
const usuariosRouter = require('./usuarios/main');

router.use('/equipos', equiposrouter);
router.use('/usuarios', middleware, usuariosRouter);

router.get('/', function(req, res, next){
  res.send("Archivo principal de la API");
})

module.exports = router;