import FormPartido from "./Form-partido/main";
import FormLiga from "./Form-liga/main";
import FormEquipo from "./Form-equipo/main";
import FormUsuario from "./Form-usuario/main";

export default function Formularios() {
  
  return (
    <div className="Seccion p-6 space-y-8">

      <section>
        <h2>Gestión de Partidos</h2>
        <FormPartido />
      </section>

      <section >
        <h2>Gestión de Ligas</h2>
        <FormLiga />
      </section>

      <section>
        <h2 >Gestión de Equipos</h2>
        <FormEquipo />
      </section>

      <section >
        <h2>Gestión de Usuarios</h2>
        <FormUsuario />
      </section>

    </div>
  );
}
