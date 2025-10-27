const router = require('express').Router();
const db = require('../../conexion');

const { verificarPass, generarToken } = require('@damianegreco/hashpass');

const {TOKEN_SECRET} = process.env;

router.post('/', function(req, res, next){
  const {user, pass} = req.body;

  let sql = "SELECT id, nombre, rol, pass FROM usuario ";
  sql += "WHERE rol = ?";

  db.query(sql, [rol])
  .then(([usuario]) => {
    if (usuario && usuario.length === 1){
      const usuarios = usuario[0];
      if (verificarPass(pass, usuario.pass)){
       

        const token = generarToken(
          TOKEN_SECRET, 
          4, 
          { nombre: usuarios.nombre, rol: usuarios.rol }
        )

        res.status(200).json({status:"ok", token});
      } else {
        console.error("Usuario no encontrado");
        res.status(401).send("Usuario y/o contraseña incorrecto");
      }
    } else {
      console.error("Usuario no encontrado");
      res.status(401).send("Usuario y/o contraseña incorrecto");
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send("Ocurrio un error");
  })
})

module.exports = router;