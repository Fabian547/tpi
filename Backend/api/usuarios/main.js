const router = require('express').Router();
const db = require('../../conexion');
const { hashPass } = require('@damianegreco/hashpass');

const loginRouter = require('./login');

// 🟢 Obtener todos los usuarios (con búsqueda opcional)
router.get("/", async (req, res) => {
  const { busqueda } = req.query;

  let sql = "SELECT * FROM usuario"; 
  const params = [];

  if (busqueda) {
    sql += " WHERE Nombre LIKE ?";
    params.push(`%${busqueda}%`);
  }

  try {
    const [usuarios] = await db.query(sql, params);
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send("Ocurrió un error al obtener usuarios");
  }
});

// 🟡 Crear un nuevo usuario
router.post("/", async (req, res) => {
  const { Nombre, Contraseña, Rol } = req.body;

  if (!Nombre || !Contraseña || !Rol) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const passHash = hashPass(Contraseña);

    const sql = "INSERT INTO usuario (Nombre, Contraseña, Rol) VALUES (?, ?, ?)";
    await db.query(sql, [Nombre, passHash, Rol]);

    res.status(201).send("Usuario guardado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar usuario");
  }
});

// 🔵 Actualizar un usuario
router.put("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  const { Nombre, Contraseña, Rol } = req.body;

  try {
    let sql = "UPDATE usuario SET Nombre = ?, Rol = ?";
    const params = [Nombre, Rol];

    if (Contraseña) {
      sql += ", Contraseña = ?";
      params.push(hashPass(Contraseña));
    }

    sql += " WHERE id = ?";
    params.push(usuario_id);

    await db.query(sql, params);
    res.status(200).send("Usuario actualizado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar usuario");
  }
});

// 🔴 Eliminar usuario
router.delete("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  try {
    await db.query("DELETE FROM usuario WHERE id = ?", [usuario_id]);
    res.status(200).send("Usuario eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar usuario");
  }
});

module.exports = router;
