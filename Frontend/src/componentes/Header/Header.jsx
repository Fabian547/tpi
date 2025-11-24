import "./HeaderUsuario.css";
import { useEffect, useState } from "react";
import logo from "../assets/escudo.png"; // coloca tu ruta real

export default function HeaderUsuario({ onSelectJornada, onIrTabla }) {
  const [jornadas, setJornadas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/jornadas");
        const data = await res.json();
        setJornadas(data);
      } catch (error) {
        console.log("Error cargando jornadas:", error);
      }
    };

    cargar();
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
      <button className="header-user-btn" onClick={onIrTabla}>
        Tabla
      </button>
    </header>
  );
}
