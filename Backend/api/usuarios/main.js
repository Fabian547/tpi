const router = require('express').Router();
const db = require('../../conexion');
const { hashPass } = require('@damianegreco/hashpass');

const loginRouter = require('./login');
router.use("/login", loginRouter);

// 🟢 Obtener todos los usuarios (con búsqueda opcional)
router.get("/", async (req, res) => {
  const { busqueda } = req.query;

  let sql = "SELECT * FROM usuarios";
  const params = [];

  if (busqueda) {
    sql += " WHERE nombre LIKE ?";
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
  const { nombre, contraseña, rol } = req.body;

  if (!nombre || !contraseña || !rol) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    const passHash = hashPass(contraseña);

    const sql = "INSERT INTO usuarios (nombre, contraseña, rol) VALUES (?, ?, ?)";
    await db.query(sql, [nombre, passHash, rol]);

    res.status(201).send("Usuario guardado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al guardar usuario");
  }
});

// 🔵 Actualizar un usuario
router.put("/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  const { nombre, contraseña, rol } = req.body;

  try {
    let sql = "UPDATE usuarios SET nombre = ?, rol = ?";
    const params = [nombre, rol];

    if (contraseña) {
      sql += ", contraseña = ?";
      params.push(hashPass(contraseña));
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
    await db.query("DELETE FROM usuarios WHERE id = ?", [usuario_id]);
    res.status(200).send("Usuario eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar usuario");
  }
});

module.exports = router;
