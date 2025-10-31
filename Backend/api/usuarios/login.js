const router = require('express').Router();
const db = require('../../conexion');

const { verificarPass, generarToken } = require('@damianegreco/hashpass');

const { TOKEN_SECRET } = process.env;
router.post('/', function(req, res, next) {
  const { rol, pass } = req.body;

  let sql = "SELECT id, nombre, rol, pass FROM usuario WHERE rol = ?";

  db.query(sql, [rol])
    .then(([result]) => {
      if (result && result.length === 1) {
        const usuario = result[0];

        if (verificarPass(pass, usuario.pass)) {
          // ✅ Agregamos el id en el token
          const token = generarToken(
            TOKEN_SECRET,
            4, // duración en horas
            { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
          );

          res.status(200).json({ status: "ok", token });
        } else {
          console.error("Contraseña incorrecta");
          res.status(401).send("Usuario y/o contraseña incorrecto");
        }
      } else {
        console.error("Usuario no encontrado");
        res.status(401).send("Usuario y/o contraseña incorrecto");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error en el servidor");
    });
});

module.exports = router;
