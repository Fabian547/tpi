import { useState } from "react";

export default function CrearEquipo() {
  const [nombre, setNombre] = useState("");
  const [escudo, setEscudo] = useState(null);

  const crear = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("escudo", escudo);

    console.log("Crear equipo:", { nombre, escudo });
  };

  return (
    <form 
      onSubmit={crear}
      className="form"
    >
      <div className="div-form">
      <h3 className="titulo">Crear Equipo</h3>
      <label className="form-label">Nombre de equipo</label>
      <input
        type="text"
        placeholder="Nombre del equipo"
        className="form-input"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label className="form-label">Escudo del equipo</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="form-input"
        onChange={(e) => setEscudo(e.target.files[0])}
      />
      </div>
      <button className="form-button">
        Crear
      </button>
    </form>
  );
}
