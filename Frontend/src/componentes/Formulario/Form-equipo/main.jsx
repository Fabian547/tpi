import CrearEquipo from "./Form-crear-equipo";
import EliminarEquipo from "./Form-Eliminar-Equipo";
import ModificarEquipo from "./Form-Modificar-equipo";

export default function FormEquipoIndex() {
  return (
    <div className="space-y-6">
      <CrearEquipo />
      <EliminarEquipo />
      <ModificarEquipo />
    </div>
  );
}
