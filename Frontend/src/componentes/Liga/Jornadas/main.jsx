import { useEffect, useState } from "react";

// Importar vistas de Liga
import JornadasUsuario from "./Jornadas/main";
import JornadasAdmin from "./Jornadas-Admin/main";
import TablaPosiciones from "./Tabla/tabla";

import "./main.css";

export default function LigaMain() {
  const [rol, setRol] = useState("usuario"); // usuario | admin
  const [vista, setVista] = useState("jornadas"); // jornadas | tabla

  useEffect(() => {
    // Detecta el rol desde login
    const r = localStorage.getItem("rol");
    if (r) setRol(r);
  }, []);

  return (
    <div className="liga-contenedor">
      <h1 className="titulo-liga">Gestión de Liga</h1>

      {/* Navegación interna */}
      <div className="liga-nav">
        <button
          className={vista === "jornadas" ? "activo" : ""}
          onClick={() => setVista("jornadas")}
        >
          Jornadas
        </button>

        <button
          className={vista === "tabla" ? "activo" : ""}
          onClick={() => setVista("tabla")}
        >
          Tabla de Posiciones
        </button>
      </div>

      {/* Vista seleccionada */}
      <div className="liga-vista">
        {vista === "jornadas" &&
          (rol === "admin" ? <JornadasAdmin /> : <JornadasUsuario />)}

        {vista === "tabla" && <TablaPosiciones />}
      </div>
    </div>
  );
}
