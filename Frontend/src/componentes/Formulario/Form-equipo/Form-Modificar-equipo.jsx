import { useState, useEffect } from "react";

export default function ModificarEquipo() {
  const [equipos, setEquipos] = useState([]);
  const [nombreSeleccionado, setNombreSeleccionado] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEscudo, setNuevoEscudo] = useState(null);

  useEffect(() => {
    setEquipos([
      { nombre: "Boca" },
      { nombre: "River" },
      { nombre: "Racing" }
    ]);
  }, []);

  const modificar = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombreViejo", nombreSeleccionado);
    formData.append("nuevoNombre", nuevoNombre);
    formData.append("escudoNuevo", nuevoEscudo);

    console.log("Modificar equipo:", {
      nombreSeleccionado,
      nuevoNombre,
      nuevoEscudo
    });
  };

  return (
    <form
      onSubmit={modificar}
      className="p-4 border rounded-xl shadow space-y-3"
    >
      <h3 className="text-lg font-semibold">Modificar Equipo</h3>

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

      <input
        type="text"
        placeholder="Nuevo nombre del equipo"
        className="border p-2 rounded w-full"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
      />

      <input
        type="file"
        accept="image/png, image/jpeg"
        className="border p-2 rounded w-full"
        onChange={(e) => setNuevoEscudo(e.target.files[0])}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Modificar
      </button>
    </form>
  );
}
