import { useState, useEffect } from "react";

export default function EliminarEquipo() {
  const [equipos, setEquipos] = useState([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");

  useEffect(() => {
    // Datos de ejemplo, después reemplazás con fetch de BD
    setEquipos([
      { nombre: "Boca" },
      { nombre: "River" },
      { nombre: "Racing" }
    ]);
  }, []);

  const eliminar = (e) => {
    e.preventDefault();
    console.log("Eliminar equipo:", nombreSeleccionado);
  };

  return (
    <form
      onSubmit={eliminar}
      className="p-4 border rounded-xl shadow space-y-3"
    >
      <h3 className="text-lg font-semibold">Eliminar Equipo</h3>

      <select
        className="border p-2 rounded w-full"
        value={nombreSeleccionado}
        onChange={(e) => setNombreSeleccionado(e.target.value)}
      >
        <option value="">Seleccione un equipo</option>

        {equipos.map((e, index) => (
          <option key={index} value={e.nombre}>
            {e.nombre}
          </option>
        ))}
      </select>

      <button className="bg-red-600 text-white px-4 py-2 rounded">
        Eliminar
      </button>
    </form>
  );
}
