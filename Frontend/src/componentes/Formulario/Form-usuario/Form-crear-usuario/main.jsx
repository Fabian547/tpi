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
    <form onSubmit={handleSubmit} className="border p-4 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Crear Usuario</h2>

      <input
        type="text"
        placeholder="Nombre del usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
};

export default CrearUsuario;
