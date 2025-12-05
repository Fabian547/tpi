import React, { useState } from "react";
import axios from "axios";
import '../../form.css'

const CrearLiga = () => {
  const [nombreLiga, setNombreLiga] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreLiga.trim()) {
      alert("Por favor ingresa un nombre para la liga");
      return;
    }

    try {
      const res = await axios.post("http://localhost:9000/api/ligas", {
        nombre: nombreLiga,
      });
      alert("Liga creada correctamente");
      console.log(res.data);
      setNombreLiga("");
    } catch (err) {
      console.error("Error al crear la liga:", err);
      alert("Hubo un error al crear la liga");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">Crear Liga</h2>

      <div className="div-form">
        <label className="form-label">Nombre de liga</label>
        <input
          type="text"
          value={nombreLiga}
          onChange={(e) => setNombreLiga(e.target.value)}
          placeholder="Nombre de la liga"
          className="form-input"
        />
        <div className="button">
        <button type="submit" className="form-button">
          Crear
        </button>
        </div>
      </div>
    </form>
  );
};

export default CrearLiga;
