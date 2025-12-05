import { useState, useEffect } from "react";

export default function EliminarEquipo() {
  const [equipos, setEquipos] = useState([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");

  useEffect(() => {
    // Datos de ejemplo, después reemplazás con fetch de BD
    setEquipos([
      { nombre: "Boca" },
      { nombre: "River" },
      { nombre: "Racing" }
    ]);
  }, []);

  const eliminar = (e) => {
    e.preventDefault();
    console.log("Eliminar equipo:", nombreSeleccionado);
  };

  return (
    <form
      onSubmit={eliminar}
      className="form"
    >
      <div className="div-form">
      <h3 className="titulo">Eliminar Equipo</h3>
      <label className="form-label">selecione equipo</label>
      <select
        className="form-select"
        value={nombreSeleccionado}
        onChange={(e) => setNombreSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un equipo</option>

        {equipos.map((e, index) => (
          <option key={index} value={e.nombre}>
            {e.nombre}
          </option>
        ))}
      </select>
        </div>
      <button className="form-button">
        Eliminar
      </button>
    </form>
  );
}
