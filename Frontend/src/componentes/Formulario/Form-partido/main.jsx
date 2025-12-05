import React from "react";
import CrearPartido from "./Form-crear-partido/main";
import CrearJornada from "./Form-crear-jornada/main";
import ModificarPartido from "./Form-modificar-partido/main";

const FormPartido = () => {
  return (
    <div className="formulario">
      <h1 className="titulo">Gestión de Partidos</h1>
      <CrearPartido />
      <CrearJornada />
      <ModificarPartido />
    </div>
  );
};

export default FormPartido;
