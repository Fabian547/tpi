import React, { useState } from "react";
import axios from "axios";

const CrearUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !pass.trim()) {
      alert("Completa todos los campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:9000/api/usuarios", {
        nombre,
        pass
      });

      alert("Usuario creado correctamente");
      setNombre("");
      setPass("");
    } catch (err) {
      console.error(err);
      alert("Error al crear usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="titulo">Crear Usuario</h2>
     <label className="form-label">Nombre de usuario</label>
      <div className="div-form">
      <input
        type="text"
        placeholder="Nombre del usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="form-input"
      />
       <label className="form-label">contraseña de usuario</label>

      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="form-input"
      />
      </div>
      <div className="button">
        <button type="submit" className="form-button">
          Crear
        </button>
        </div>
    </form>
  );
};

export default CrearUsuario;
