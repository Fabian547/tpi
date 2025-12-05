import React, { useState, useEffect } from "react";
import axios from "axios";

const EliminarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      alert("Selecciona un usuario");
      return;
    }

    try {
      await axios.delete(`http://localhost:9000/api/usuarios/${idUsuario}`);
      alert("Usuario eliminado");
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <form onSubmit={handleEliminar} className="form">
      <h2 className="titulo">Eliminar Usuario</h2>
      <div className="div-form">
      <label className="form-label">usuario</label>
      <select
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
        className="form-select"
      >
        <option value="">Selecciona un usuario...</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>
      </div>
      <div className="button">
        <button type="submit" className="form-button">
          Eliminar
        </button>
        </div>
    </form>
  );
};

export default EliminarUsuario;
