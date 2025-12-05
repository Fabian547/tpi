import React from "react";

import CrearUsuario from "./Form-crear-usuario/main";
import EliminarUsuario from "./Form-eliminar-usuario/main";
import ModificarUsuario from "./Form-modificar-usuario/main";

export default function FormUsuario() {
  return (
    <div className="formulario">
      <h1 className="titulo">Gestión de Equipos</h1>

      <CrearUsuario />

      <EliminarUsuario />

      <ModificarUsuario />

    </div>
  );
}
