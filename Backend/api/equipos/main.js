const router = require('express').Router();
const db = require('../../conexion');
const path = require('path');
const fs = require("fs");
const fileUpload = require("express-fileupload");

const directorio = path.join(__dirname, "..", "..", "archivos", "escudos");

if (!fs.existsSync(directorio)) {
  fs.mkdirSync(directorio, { recursive: true });
}

router.post("/escudo", fileUpload(), function (req, res, next) {
  if (!req.files || !req.files.archivo) {
    console.error("No hay archivo");
    return res.status(403).send("No hay archivo");
  }

  const { archivo } = req.files;
  const extension = path.extname(archivo.name).toLowerCase();

  if (extension !== ".jpg" && extension !== ".png") {
    console.error("Archivo no permitido");
    return res.status(403).send("Solo se permiten archivos .jpg o .png");
  }

  const nombreUnico = `${Date.now()}${extension}`;
  const filepath = path.join(directorio, nombreUnico);

  archivo.mv(filepath, function (error) {
    if (error) {
      console.error(error);
      return res.status(500).send("Ocurrió un error al guardar el archivo");
    }
    res.status(201).json({ mensaje: "Escudo guardado correctamente", archivo: nombreUnico });
  });
});

router.get("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const { busqueda } = req.query;

  try {
    let sql = `
      SELECT e.*, u.Nombre AS creador
      FROM equipos e
      JOIN usuario u ON e.id_usuario = u.id
      WHERE e.id_Ligas = ?
    `;
    const params = [id_liga];

    if (busqueda) {
      sql += " AND e.Nombre LIKE ?";
      params.push(`%${busqueda}%`);
    }

    const [equipos] = await db.query(sql, params);
    res.json(equipos);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener equipos de la liga");
  }
});

router.post("/:id_liga", async function (req, res, next) {
  const { id_liga } = req.params;
  const { nombre, escudo } = req.body;
  const id_usuario = req.user.id;

  try {
    const [liga] = await db.query("SELECT * FROM ligas WHERE id = ?", [id_liga]);
    if (liga.length === 0) {
      return res.status(404).send("La liga no existe");
    }

    await db.query(
      "INSERT INTO equipos (Nombre, Escudo, id_usuario, id_Ligas) VALUES (?, ?, ?, ?)",
      [nombre, escudo, id_usuario, id_liga]
    );

    res.status(201).send("Equipo creado correctamente en la liga");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al crear equipo");
  }
});

router.put("/:id_liga/:equipo_id", async function (req, res, next) {
  const { id_liga, equipo_id } = req.params;
  const { nombre, escudo } = req.body;
  const id_usuario = req.user.id;

  try {
    const sql = `
      UPDATE equipos
      SET Nombre = ?, Escudo = ?
      WHERE id = ? AND id_Ligas = ? AND id_usuario = ?
    `;
    const [result] = await db.query(sql, [nombre, escudo, equipo_id, id_liga, id_usuario]);

    if (result.affectedRows === 0) {
      return res.status(404).send("Equipo no encontrado o no autorizado");
    }

    res.status(200).send("Equipo actualizado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar equipo");
  }
});

router.delete("/:id_liga/:equipo_id", async function (req, res, next) {
  const { id_liga, equipo_id } = req.params;
  const id_usuario = req.user.id;

  try {
    const [result] = await db.query(
      "DELETE FROM equipos WHERE id = ? AND id_Ligas = ? AND id_usuario = ?",
      [equipo_id, id_liga, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Equipo no encontrado o no autorizado");
    }

    res.status(200).send("Equipo eliminado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar equipo");
  }
});

module.exports = router;