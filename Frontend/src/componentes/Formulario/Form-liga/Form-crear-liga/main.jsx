import React, { useState } from "react";
import axios from "axios";

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
    <form
      onSubmit={handleSubmit}
      className="border p-4 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Crear Liga</h2>
      <input
        type="text"
        value={nombreLiga}
        onChange={(e) => setNombreLiga(e.target.value)}
        placeholder="Nombre de la liga"
        className="w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Crear
      </button>
    </form>
  );
};

export default CrearLiga;
