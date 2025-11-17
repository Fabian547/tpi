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
      className="p-4 border rounded-xl shadow space-y-3"
    >
      <h3 className="text-lg font-semibold">Crear Equipo</h3>

      <input
        type="text"
        placeholder="Nombre del equipo"
        className="border p-2 rounded w-full"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        className="border p-2 rounded w-full"
        onChange={(e) => setEscudo(e.target.files[0])}
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}
