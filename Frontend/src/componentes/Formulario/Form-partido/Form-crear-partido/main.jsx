import React, { useState } from "react";
import { useDatosFutbol } from "../../../../hooks/UsedatosFutbol";

const CrearPartido = () => {
  const { equipos, jornadas, crearPartido, loading } = useDatosFutbol();
  const [partido, setPartido] = useState({
    nombre: "",
    id_jornada: "",
    id_local: "",
    id_visitante: "",
  });

  if (loading) return <p>Cargando...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearPartido(partido);
    alert("✅ Partido creado");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">Crear partido</h2>
      <div className="div-form">
      <label className="form-label">Crear partido</label>

      <input
        type="text"
        placeholder="Nombre del partido"
        className="form-input"
        value={partido.nombre}
        onChange={(e) => setPartido({ ...partido, nombre: e.target.value })}
        required
      />
      <label className="form-label">Jornadas</label>
      <select
        className="form-select"
        value={partido.id_jornada}
        onChange={(e) => setPartido({ ...partido, id_jornada: e.target.value })}
        required
      >
        <option value="">Seleccionar Jornada</option>
        {jornadas.map((j) => (
          <option key={j.id} value={j.id}>{j.nombre}</option>
        ))}
      </select>
        <label className="form-label">Equipo local</label>
        <select
          className="form-select"
          value={partido.id_local}
          onChange={(e) => setPartido({ ...partido, id_local: e.target.value })}
          required
        >
          <option value="">Equipo Local</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
          <label className="form-label">Equipo visitante</label>
        <select
          className="form-select"
          value={partido.id_visitante}
          onChange={(e) => setPartido({ ...partido, id_visitante: e.target.value })}
          required
        >
          <option value="">Equipo Visitante</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
      </div>

      <div className="button">
        <button type="submit" className="form-button">
          Crear partido
        </button>
        </div>
    </form>
  );
};

export default CrearPartido;
