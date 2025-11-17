import React, { useState } from "react";
import { useDatosFutbol } from "../useDatosFutbol";

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
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Modificar Partido</h2>

      <select
        className="w-full border p-2 rounded mb-4"
        value={datos.id}
        onChange={(e) => setDatos({ ...datos, id: e.target.value })}
        required
      >
        <option value="">Seleccionar Partido</option>
        {partidos.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={datos.id_local}
          onChange={(e) => setDatos({ ...datos, id_local: e.target.value })}
          required
        >
          <option value="">Nuevo Local</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
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

      <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
        Modificar Partido
      </button>
    </form>
  );
};

export default ModificarPartido;
