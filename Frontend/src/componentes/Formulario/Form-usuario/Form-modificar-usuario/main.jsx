import React, { useState, useEffect } from "react";
import axios from "axios";

const ModificarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");

  const [nuevoNombre, setNuevoNombre] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [rol, setRol] = useState("usuario");

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

  const handleModificar = async (e) => {
    e.preventDefault();

    if (!idUsuario) {
      alert("Selecciona un usuario");
      return;
    }

    if (pass1 !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/usuarios/${idUsuario}`, {
        nombre: nuevoNombre,
        pass: pass1,
        rol
      });

      alert("Usuario modificado correctamente");
      cargarUsuarios();
    } catch (err) {
      console.error(err);
      alert("Error al modificar usuario");
    }
  };

  return (
    <form onSubmit={handleModificar} className="form">
      <h2 className="titulo">Modificar Usuario</h2>
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
        <label className="form-label">Nuevo nombre usuario</label>
      <input
        type="text"
        placeholder="Nuevo nombre"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
        className="form-input"
      />
    <label className="form-label">Nueva contraseña de usuario</label>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <label className="form-label">Confirmacion de la contraseña de usuario</label>

      <input
        type="password"
        placeholder="Confirmar nueva contraseña"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        className="form-input"
      />
      <label className="form-label">Rol del usuario</label>

      <select
        value={rol}
        onChange={(e) => setRol(e.target.value)}
        className="form-select"
      >
        <option value="usuario">Usuario</option>
        <option value="admin">Admin</option>
      </select>
        </div>
      <div className="button">
        <button type="submit" className="form-button">
          Modificar
        </button>
        </div>
    </form>
  );
};

export default ModificarUsuario;
