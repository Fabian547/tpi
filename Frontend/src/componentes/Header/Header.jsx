import "./Header.css";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png"; // ajustá la ruta

export default function HeaderUsuario({ onSelectJornada, onSelectLiga }) {
  const [jornadas, setJornadas] = useState([]);

  useEffect(() => {
    const fetchJornadas = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/jornadas");
        const data = await res.json();
        setJornadas(data);
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchJornadas();
  }, []);

  return (
    <header className="header-user">

      {/* LOGO */}
      <div className="header-user-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* SELECT JORNADAS */}
      <select
        className="header-user-select"
        onChange={(e) => onSelectJornada(e.target.value)}
      >
        <option value="">Jornada ▼</option>
        {jornadas.map((j) => (
          <option key={j.id} value={j.id}>
            {j.nombre}
          </option>
        ))}
      </select>

      {/* BOTÓN TABLA */}
      <button
        className="header-user-btn"
        onClick={() => onSelectLiga("tabla")}
      >
        Tabla
      </button>

    </header>
  );
}
