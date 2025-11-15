import React, { useState, useEffect } from "react";
import axios from "axios";

const EliminarLiga = () => {
  const [ligas, setLigas] = useState([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState("");

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

  const handleEliminar = async (e) => {
    e.preventDefault();
    if (!ligaSeleccionada) {
      alert("Selecciona una liga para eliminar");
      return;
    }

    try {
      await axios.delete(`http://localhost:9000/api/ligas/${ligaSeleccionada}`);
      alert("Liga eliminada correctamente");
      cargarLigas();
    } catch (err) {
      console.error("Error al eliminar la liga:", err);
      alert("Error al eliminar la liga");
    }
  };

  return (
    <form
      onSubmit={handleEliminar}
      className="border p-4 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Eliminar Liga</h2>
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
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </form>
  );
};

export default EliminarLiga;
