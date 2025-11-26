import React from "react";
import CrearPartido from "./Form-crear-partido/main";
import CrearJornada from "./Form-crear-jornada/main";
import ModificarPartido from "./Form-modificar-partido/main";

const FormPartido = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestión de Partidos</h1>
      <CrearPartido />
      <CrearJornada />
      <ModificarPartido />
    </div>
  );
};

export default FormPartido;
