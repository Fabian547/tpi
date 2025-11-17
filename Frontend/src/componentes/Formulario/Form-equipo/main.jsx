import CrearEquipo from "./crear-equipo/main";
import EliminarEquipo from "./eliminar-equipo/main";
import ModificarEquipo from "./modificar-equipo/main";

export default function FormEquipoIndex() {
  return (
    <div className="space-y-6">
      <CrearEquipo />
      <EliminarEquipo />
      <ModificarEquipo />
    </div>
  );
}
