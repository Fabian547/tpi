import React, { useState } from "react";

import InicioDeSesion from "./Inicio-de-sesion";
import Registrar from "./Registrar";

export default function LoginMain() {
  const [vista, setVista] = useState("login"); 
  // valores posibles: "login", "registro"

  return (
    <div>
      {vista === "login" && (
        <InicioDeSesion
          onIrARegistro={() => setVista("registro")}
        />
      )}

      {vista === "registro" && (
        <Registrar
          onIrALogin={() => setVista("login")}
        />
      )}
    </div>
  );
}
