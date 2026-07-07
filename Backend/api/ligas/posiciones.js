const router = require('express').Router();
const db = require('../../conexion');

router.get('/:id_liga', async function(req, res) {
  const { id_liga } = req.params;

  try {
    const sql = `
      SELECT 
        e.id,
        e.Nombre,
        e.Escudo,
        COUNT(ep.id) AS pj,
        SUM(ep.Gol) AS gf,
        SUM(
          CASE 
            WHEN ep.Gol > ep2.Gol THEN 3
            WHEN ep.Gol = ep2.Gol THEN 1
            ELSE 0
          END
        ) AS pt
      FROM equipos e
      JOIN equipo_partidos ep ON ep.id_equipo = e.id
      JOIN equipo_partidos ep2 
        ON ep2.id_partidos = ep.id_partidos 
        AND ep2.id_equipo != e.id
      WHERE e.id_Ligas = ?
      GROUP BY e.id, e.Nombre, e.Escudo
      ORDER BY pt DESC, gf DESC
    `;

    const [posiciones] = await db.query(sql, [id_liga]);
    res.json(posiciones);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener posiciones");
  }
});

module.exports = router;