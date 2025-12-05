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
      className="form"
    >
      <div className="div-form">
      <h3 className="titulo">Modificar Equipo</h3>
      <label className="form-label"> Selecciona el equipo</label>
      <select
        className="form-select"
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
        <label className="form-label">Nuevo nombre</label>
      <input
        type="text"
        placeholder="Nuevo nombre del equipo"
        className="form-select"
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
      />
      <label className="form-label">Nuevo escudo</label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="form-input"
        onChange={(e) => setNuevoEscudo(e.target.files[0])}
      />
        </div>
      <button className="form-button">
        Modificar
      </button>
    </form>
  );
}
