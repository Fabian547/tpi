import "./Header.css";
import { useEffect, useState } from "react";

export default function HeaderAdmin({
  onSelectJornada,
  onSelectFormulario,
  onSelectLiga
}) {
  const [jornadas, setJornadas] = useState([]);

  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/jornadas");
        const data = await res.json();
        setJornadas(data);
      } catch (err) {
        console.log("Error cargando jornadas", err);
      }
    };

    fetchJornadas();
  }, []);

  return (
    <header className="top-header">

      {/* LOGO */}
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* TITULO */}
      <h1 className="header-title">Liga Master</h1>

      <div className="header-buttons">

        {/* SELECT JORNADAS */}
        <select
          className="header-select"
          onChange={(e) => onSelectJornada(e.target.value)}
        >
          <option value="">Jornada ▼</option>
          {jornadas.map((j) => (
            <option key={j.id} value={j.id}>
              {j.nombre}
            </option>
          ))}
        </select>

        {/* BOTÓN LIGA MAIN */}
        <button
          className="dropdown-btn"
          onClick={() => onSelectLiga("liga")}
        >
          Liga
        </button>

        {/* SELECT FORMULARIOS */}
        <select
          className="header-select"
          onChange={(e) => {
            if (!e.target.value) return;
            onSelectFormulario(e.target.value);
          }}
        >
          <option value="">Formularios ▼</option>
          <option value="form-liga">Form-Liga</option>
          <option value="form-usuario">Form-Usuario</option>
          <option value="form-equipos">Form-Equipos</option>
          <option value="form-partidos">Form-Partidos</option>
        </select>
      </div>
    </header>
  );
}
