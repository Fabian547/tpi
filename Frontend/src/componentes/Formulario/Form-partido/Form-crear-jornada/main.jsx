import React, { useState } from "react";
import { useDatosFutbol } from "../../../../hooks/UsedatosFutbol";

const CrearJornada = () => {
  const { crearJornada } = useDatosFutbol();
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearJornada({ nombre });
    alert("✅ Jornada creada");
    setNombre("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mb-8">
      <h2 className="text-xl font-semibold mb-4">Crear Jornada</h2>
      <input
        type="text"
        placeholder="Nombre de la jornada"
        className="w-full border p-2 rounded mb-4"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear Jornada
      </button>
    </form>
  );
};

export default CrearJornada;
