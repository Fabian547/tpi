import React, { useState, useEffect } from "react";
import axios from "axios";

const ModificarLiga = () => {
  const [ligas, setLigas] = useState([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [estado, setEstado] = useState("publico");

  const cargarLigas = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/ligas");
      setLigas(res.data);
    } catch (err) {
      console.error("Error al cargar ligas:", err);
    }
  };

  useEffect(() => {
    cargarLigas();
  }, []);

  const handleModificar = async (e) => {
    e.preventDefault();
    if (!ligaSeleccionada) {
      alert("Selecciona una liga para modificar");
      return;
    }

    try {
      await axios.put(`http://localhost:9000/api/ligas/${ligaSeleccionada}`, {
        nombre: nuevoNombre,
        estado,
      });
      alert("Liga modificada correctamente");
      cargarLigas();
    } catch (err) {
      console.error("Error al modificar la liga:", err);
      alert("Error al modificar la liga");
    }
  };

  return (
    <form
      onSubmit={handleModificar}
      className="border p-4 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Modificar Liga</h2>

      <select
        value={ligaSeleccionada}
        onChange={(e) => setLigaSeleccionada(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Seleccionar liga...</option>
        {ligas.map((liga) => (
          <option key={liga.id} value={liga.id}>
            {liga.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
        placeholder="Nuevo nombre de la liga"
        className="w-full p-2 border rounded-md"
      />

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="publico">Público</option>
        <option value="privado">Privado</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Modificar
      </button>
    </form>
  );
};

export default ModificarLiga;
