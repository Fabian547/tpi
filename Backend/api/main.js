const router = require('express').Router();
const middleware = require('./middleware');

const equiposrouter = require('./equipos/main');
const usuariosRouter = require('./usuarios/main');
const ligasrouter = require('./ligas/main');
const partidosrouter = require('./partidos/main');

// Ruta pública (sin auth)
router.use('/usuarios/login', require('./usuarios/login'));

// Middleware de autenticación
router.use(middleware);

// Rutas protegidas
router.use('/equipos', equiposrouter);
router.use('/usuarios', usuariosRouter);
router.use('/ligas', ligasrouter);
router.use('/partidos', partidosrouter);

router.get('/', function(req, res, next){
  res.send("Archivo principal de la API");
});

module.exports = router;