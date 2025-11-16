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
    <form onSubmit={handleEliminar} className="border p-4 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Eliminar Usuario</h2>

      <select
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Selecciona un usuario...</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>{u.nombre}</option>
        ))}
      </select>

      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
        Eliminar
      </button>
    </form>
  );
};

export default EliminarUsuario;
