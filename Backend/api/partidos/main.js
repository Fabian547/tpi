const router = require('express').Router();
const db = require('../../conexion');

router.get("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const { busqueda } = req.query;

  try {
    let sql = `
      SELECT p.*, u.nombre AS creador
      FROM partido p
      JOIN usuario u ON p.id_usuario = u.id
      WHERE p.id_ligas = ?
    `;
    const params = [id_liga];

    if (busqueda) {
      sql += " AND p.nombre LIKE ?";
      params.push(`%${busqueda}%`);
    }

    const [partidos] = await db.query(sql, params);
    res.json(partidos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener partidos de la liga");
  }
});

router.post("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const { nombre, estado } = req.body;
  const id_usuario = req.usuario.id; 

  try {
    const [liga] = await db.query("SELECT * FROM liga WHERE id = ?", [id_liga]);
    if (liga.length === 0) {
      return res.status(404).send("La liga no existe");
    }

    await db.query(
      "INSERT INTO partido (nombre, estado, id_usuario, id_ligas) VALUES (?, ?, ?, ?)",
      [nombre, estado, id_usuario, id_liga]
    );

    res.status(201).send("Partido creado correctamente en la liga");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear partido");
  }
});

router.put("/:id_liga/:partido_id", async function (req, res, next) {
  const { id_liga, partido_id } = req.params;
  const { nombre, estado } = req.body;
  const id_usuario = req.usuario.id;

  try {
    const sql = `
      UPDATE partido
      SET nombre = ?, estado = ?
      WHERE id = ? AND id_ligas = ? AND id_usuario = ?
    `;
    const [result] = await db.query(sql, [nombre, estado, partido_id, id_liga, id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Partido no encontrado o no autorizado");
    }

    res.status(200).send("Partido actualizado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar partido");
  }
});


router.delete("/:id_liga/:partido_id", async function (req, res, next) {
  const { id_liga, partido_id } = req.params;
  const id_usuario = req.usuario.id;

  try {
    const [result] = await db.query(
      "DELETE FROM partido WHERE id = ? AND id_ligas = ? AND id_usuario = ?",
      [partido_id, id_liga, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Partido no encontrado o no autorizado");
    }

    res.status(200).send("Partido eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar partido");
  }
});

module.exports = router;
