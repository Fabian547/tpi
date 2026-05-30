const router = require('express').Router();

const middleware = require('./middleware');

const equiposrouter = require('./equipos/main');
const usuariosRouter = require('./usuarios/main');
const usuariosRouter2 = require('./usuarios/login');
const ligasrouter = require('./ligas/main');
const partidosrouter = require('./partidos/main');

router.use('/equipos', equiposrouter);
router.use('/usuarios', usuariosRouter);
router.use('/usuarios', usuariosRouter2);
router.use('/ligas', ligasrouter);
router.use('/partidos', partidosrouter);

router.get('/', function(req, res, next){
  res.send("Archivo principal de la API");
})

module.exports = router;