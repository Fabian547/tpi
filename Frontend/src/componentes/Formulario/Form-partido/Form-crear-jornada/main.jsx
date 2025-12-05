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
    <form onSubmit={handleSubmit} className="form">
      
      <h2 className="titulo">Crear Jornada</h2>
      <label className="form-label">Nombre jornada</label>
      <div className="div-form">
      <input
        type="text"
        placeholder="Nombre de la jornada"
        className="form-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      </div>
      <div className="button">
        <button type="submit" className="form-button">
          Crear jornada
        </button>
        </div>
    </form>
  );
};

export default CrearJornada;
