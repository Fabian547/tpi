const router = require("express").Router();
const db = require("../../conexion");


router.get("/", async function (req, res, next) {
  const id_usuario = req.user.id;
  const { busqueda } = req.query;

  try {
    let sql = `
      SELECT l.*, u.nombre AS creador
      FROM ligas l
      JOIN usuario u ON l.id_usuario = u.id
      WHERE l.estado = 'publico' OR l.id_usuario = ?
    `;
    const params = [id_usuario];

    if (busqueda) {
      sql += " AND l.nombre LIKE ?";
      params.push(`%${busqueda}%`);
    }

    const [ligas] = await db.query(sql, params);
    res.json(ligas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las ligas");
  }
});


router.post("/", async function (req, res, next) {
  const { nombre, estado } = req.body;
  const id_usuario = req.user.id;

  if (!nombre || !estado) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    await db.query(
      "INSERT INTO ligas (nombre, estado, id_usuario) VALUES (?, ?, ?)",
      [nombre, estado, id_usuario]
    );

    res.status(201).send("Liga creada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear liga");
  }
});

router.put("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const { nombre, estado } = req.body;
  const id_usuario = req.user.id;

  try {
    const sql = `
      UPDATE ligas
      SET nombre = ?, estado = ?
      WHERE id = ? AND id_usuario = ?
    `;
    const [result] = await db.query(sql, [nombre, estado, id_liga, id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Liga no encontrada o no autorizada");
    }

    res.status(200).send("Liga actualizada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar liga");
  }
});


router.delete("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const id_usuario = req.user.id;

  try {
    const [result] = await db.query(
      "DELETE FROM ligas WHERE id = ? AND id_usuario = ?",
      [id_liga, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Liga no encontrada o no autorizada");
    }

    res.status(200).send("Liga eliminada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar liga");
  }
});

module.exports = router;

