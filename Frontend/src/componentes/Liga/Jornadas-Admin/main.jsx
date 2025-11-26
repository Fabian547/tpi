import { useEffect, useState } from "react";
import ListadoPartidos from "./Listado-partido";

export default function Jornadas() {

  const [jornadas, setJornadas] = useState([]);

  // -----------------------
  // Cargar jornadas del BACK
  // -----------------------
  const cargarJornadas = async () => {
    const res = await fetch("http://localhost:9000/jornadas");
    const data = await res.json();
    setJornadas(data);
  };

  useEffect(() => {
    cargarJornadas();
  }, []);

  // -----------------------
  // MODIFICAR RESULTADO
  // -----------------------
  const modificarResultado = async (id, resultado) => {
    await fetch(`http://localhost:9000/partidos/${id}/resultado`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resultado })
    });

    cargarJornadas();
  };

  // -----------------------
  // ELIMINAR PARTIDO
  // -----------------------
  const eliminarPartido = async (id) => {
    await fetch(`http://localhost:9000/partidos/${id}`, {
      method: "DELETE"
    });

    cargarJornadas();
  };

  // -----------------------
  // MARCAR TERMINADO
  // -----------------------
  const terminarPartido = async (id) => {
    await fetch(`http://localhost:9000/partidos/${id}/terminado`, { method: "PUT" });
    cargarJornadas();
  };

  // -----------------------
  // MARCAR NO TERMINADO
  // -----------------------
  const desTerminarPartido = async (id) => {
    await fetch(`http://localhost:9000/partidos/${id}/no-terminado`, { method: "PUT" });
    cargarJornadas();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Jornadas</h1>

      {jornadas.map(j => (
        <div key={j.id} style={{ marginBottom: "40px" }}>
          <h2>{j.nombre}</h2>

          <ListadoPartidos
            partidos={j.partidos}
            modificarResultado={modificarResultado}
            eliminarPartido={eliminarPartido}
            terminarPartido={terminarPartido}
            desTerminarPartido={desTerminarPartido}
          />
        </div>
      ))}
    </div>
  );
}
