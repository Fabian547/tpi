import React, { useState } from "react";
import { useDatosFutbol } from "../../../../hooks/UsedatosFutbol";

const ModificarPartido = () => {
  const { equipos, partidos, modificarPartido, loading } = useDatosFutbol();
  const [datos, setDatos] = useState({
    id: "",
    id_local: "",
    id_visitante: "",
  });

  if (loading) return <p>Cargando...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await modificarPartido(datos.id, {
      id_local: datos.id_local,
      id_visitante: datos.id_visitante,
    });
    alert("✅ Partido modificado");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">Modificar Partido</h2>
        <div className="div-form">
        <label className="form-label">Partido</label>

      <select
        className="form-select"
        value={datos.id}
        onChange={(e) => setDatos({ ...datos, id: e.target.value })}
        required
      >
        <option value="">Seleccionar Partido</option>
        {partidos.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>
        <label className="form-label">Nuevo equipo local</label>
        <select
          className="form-select"
          value={datos.id_local}
          onChange={(e) => setDatos({ ...datos, id_local: e.target.value })}
          required
        >
          <option value="">Nuevo Local</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
          <label className="form-label">Nuevo equipo visitante</label>
        <select
          className="form-select"
          value={datos.id_visitante}
          onChange={(e) => setDatos({ ...datos, id_visitante: e.target.value })}
          required
        >
          <option value="">Nuevo Visitante</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
</div>
      <button className="form-button">
        Modificar Partido
      </button>
    </form>
  );
};

export default ModificarPartido;
