import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../form.css'

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
    <form onSubmit={handleEliminar} className="form">
      <h2 className="titulo">Eliminar Liga</h2>

      <div className="div-form">
        <label className="form-label">ligas</label>
        <select
          value={ligaSeleccionada}
          onChange={(e) => setLigaSeleccionada(e.target.value)}
          className="form-select"
        >
          <option value="">Seleccionar liga...</option>
          {ligas.map((liga) => (
            <option key={liga.id} value={liga.id}>
              {liga.nombre}
            </option>
          ))}
        </select>
          <div className="button">
        <button type="submit" className="form-button">
          Eliminar
        </button>
        </div>
      </div>
    </form>
  );
};

export default EliminarLiga;
