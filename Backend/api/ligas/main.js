const router = require("express").Router();
const db = require("../../conexion");

router.get("/", async function (req, res, next) {
  const id_usuario = req.user.id;
  const { busqueda } = req.query;

  try {
    let sql = `
      SELECT l.*, u.Nombre AS creador
      FROM ligas l
      JOIN usuario u ON l.Id_Usuario = u.id
      WHERE (l.estado = 1 OR l.Id_Usuario = ?)
    `;
    const params = [id_usuario];

    if (busqueda) {
      sql += " AND l.Nombre LIKE ?";
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

  if (!nombre || estado === undefined) {
    return res.status(400).send("Faltan datos obligatorios");
  }

  try {
    await db.query(
      "INSERT INTO ligas (Nombre, estado, Id_Usuario) VALUES (?, ?, ?)",
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
      SET Nombre = ?, estado = ?
      WHERE id = ? AND Id_Usuario = ?
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
      "DELETE FROM ligas WHERE id = ? AND Id_Usuario = ?",
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

const posicionesRouter = require('./posiciones');
router.use('/posiciones', posicionesRouter);

module.exports = router;