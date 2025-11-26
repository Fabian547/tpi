import React from "react";
import CrearLiga from "./Form-crear-liga/main";
import EliminarLiga from "./Form-eliminar-liga/main";
import ModificarLiga from "./Form-modificar-liga/main";

const FormLiga = () => {
  return (
    <div className="space-y-10 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Gestión de Ligas</h1>
      <CrearLiga />
      <EliminarLiga />
      <ModificarLiga />
    </div>
  );
};

export default FormLiga;
