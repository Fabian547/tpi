import "./Header.css";
import { useEffect, useState } from "react";
import logo from "../assets/escudo.png"; // pone tu ruta real

export default function Header({ onSelectJornada, onSelectFormulario, onIrLiga }) {
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

      {/* BOTONES / SELECTS */}
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

        {/* BOTON LIGA */}
        <button className="dropdown-btn" onClick={onIrLiga}>
          Liga
        </button>

        {/* SELECT FORMULARIOS */}
        <select
          className="header-select"
          onChange={(e) => onSelectFormulario(e.target.value)}
        >
          <option value="">Admin ▼</option>
          <option value="form-liga">Form-Liga</option>
          <option value="form-usuario">Form-Usuario</option>
          <option value="form-equipos">Form-Equipos</option>
          <option value="form-partidos">Form-Partidos</option>
        </select>

      </div>
    </header>
  );
}
