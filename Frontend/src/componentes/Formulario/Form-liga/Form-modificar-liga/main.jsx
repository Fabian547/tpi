import React, { useState, useEffect } from "react"; 
import axios from "axios";
import '../../form.css'

const ModificarLiga = () => {
  const [ligas, setLigas] = useState([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [estado, setEstado] = useState("publico");

  const cargarLigas = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/ligas");
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
      await axios.put(`http://localhost:3000/api/ligas/${ligaSeleccionada}`, {
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
    <form onSubmit={handleModificar} className="form">
      <h2 className="titulo">Modificar Liga</h2>

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
            <label className="form-label">Nuevo nombre de liga</label>
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nuevo nombre de la liga"
          className="form-input"
        />
        <label className="form-label">Estado de liga</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="form-select"
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>

        <div className="button">
        <button type="submit" className="form-button">
         Modificar
        </button>
        </div>
      </div>
    </form>
  );
};

export default ModificarLiga;
