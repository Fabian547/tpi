const router = require('express').Router();
const db = require('../../conexion');

const { verificarPass, generarToken } = require('@damianegreco/hashpass');

const { TOKEN_SECRET } = process.env;

router.post('/', function(req, res) {
  const { pass, user } = req.body;

  // Usamos la tabla real: usuario
  const sql = "SELECT id, Nombre, Rol, Contraseña FROM usuario WHERE Nombre = ?";

  db.query(sql, [user])
    .then(([result]) => {
      if (result && result.length === 1) {

        const usuario = result[0];

        if (verificarPass(pass, usuario.Contraseña)) {

          const token = generarToken(
            TOKEN_SECRET,
            40, // horas
            { id: usuario.id, nombre: usuario.Nombre, rol: usuario.Rol }
          );

          res.status(200).json({ status: "ok", token });

        } else {
          res.status(401).send("Usuario y/o contraseña incorrecto");
        }

      } else {
        res.status(401).send("Usuario y/o contraseña incorrecto");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Ocurrió un error en el servidor");
    });
});

module.exports = router;
