import CrearEquipo from "./Form-crear-equipo";
import EliminarEquipo from "./Form-Eliminar-Equipo";
import ModificarEquipo from "./Form-Modificar-equipo";
import '../form.css'
export default function FormEquipoIndex() {
  return (
    <div className="formulario">
      <h1 className="titulo">Gestión de Equipos</h1>
      <CrearEquipo />
      <EliminarEquipo />
      <ModificarEquipo />
    </div>
  );
}
