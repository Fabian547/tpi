import { useEffect, useState } from "react";
import HeaderAdmin from "./header-Admin";
import HeaderUsuario from "./Header";

import JornadasAdmin from "../Liga/Jornadas-Admin/main";
import JornadasUsuario from "../Liga/Jornadas/main";
import TablaPosiciones from "../Liga/Tabla";

import "./header.css";

export default function LigaMain() {
  const [rol, setRol] = useState("usuario"); // valor por defecto
  const [vista, setVista] = useState("jornadas"); // jornadas | tabla
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem("rol");
    if (r) setRol(r);
  }, []);

  return (
    <div className="liga-container">
      
      {/* HEADER SEGÚN ROL */}
      {rol === "admin" ? (
        <HeaderAdmin
          onSelectJornada={(id) => {
            setVista("jornadas");
            setJornadaSeleccionada(id);
          }}
          onSelectFormulario={(form) => {
            if (!form) return;
            setVista(form); 
          }}
          onIrLiga={() => setVista("tabla")}
        />
      ) : (
        <HeaderUsuario
          onSelectJornada={(id) => {
            setVista("jornadas");
            setJornadaSeleccionada(id);
          }}
          onIrTabla={() => setVista("tabla")}
        />
      )}

      {/* CONTENIDO SEGÚN VISTA */}
      <div className="liga-content">
        {vista === "jornadas" && (
          rol === "admin" ? (
            <JornadasAdmin jornadaId={jornadaSeleccionada} />
          ) : (
            <JornadasUsuario jornadaId={jornadaSeleccionada} />
          )
        )}

        {vista === "tabla" && <TablaPosiciones />}

        {/* FORMULARIOS ADMIN */}
        {rol === "admin" && vista === "form-liga" && <p>Formulario Liga</p>}
        {rol === "admin" && vista === "form-usuario" && <p>Formulario Usuario</p>}
        {rol === "admin" && vista === "form-equipos" && <p>Formulario Equipos</p>}
        {rol === "admin" && vista === "form-partidos" && <p>Formulario Partidos</p>}
      </div>
    </div>
  );
}
