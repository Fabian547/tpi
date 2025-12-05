import React from "react";
import CrearLiga from "./Form-crear-liga/main";
import EliminarLiga from "./Form-eliminar-liga/main";
import ModificarLiga from "./Form-modificar-liga/main";
import '../form.css'

const FormLiga = () => {
  return (
    <div className="formulario">
      <h1 className="titulo">Gestión de Ligas</h1>
      <CrearLiga />
      <EliminarLiga />
      <ModificarLiga />
    </div>
  );
};

export default FormLiga;