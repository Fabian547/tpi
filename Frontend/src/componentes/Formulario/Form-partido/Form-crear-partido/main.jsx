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
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Crear Partido</h2>

      <input
        type="text"
        placeholder="Nombre del partido"
        className="w-full border p-2 rounded mb-4"
        value={partido.nombre}
        onChange={(e) => setPartido({ ...partido, nombre: e.target.value })}
        required
      />

      <select
        className="w-full border p-2 rounded mb-4"
        value={partido.id_jornada}
        onChange={(e) => setPartido({ ...partido, id_jornada: e.target.value })}
        required
      >
        <option value="">Seleccionar Jornada</option>
        {jornadas.map((j) => (
          <option key={j.id} value={j.id}>{j.nombre}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={partido.id_local}
          onChange={(e) => setPartido({ ...partido, id_local: e.target.value })}
          required
        >
          <option value="">Equipo Local</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
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

      <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Crear Partido
      </button>
    </form>
  );
};

export default CrearPartido;
