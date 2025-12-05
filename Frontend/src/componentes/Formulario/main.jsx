import FormPartido from "./Form-partido/main";
import FormLiga from "./Form-liga/main";
import FormEquipo from "./Form-equipo/main";
import FormUsuario from "./Form-usuario/main";

export default function Formularios({ vista }) {

  return (
    <div className="formulario-padre">

      {vista === "form-partidos" && (
        <section>
          <FormPartido />
        </section>
      )}

      {vista === "form-liga" && (
        <section>
          <FormLiga />
        </section>
      )}

      {vista === "form-equipos" && (
        <section>
          <FormEquipo />
        </section>
      )}

      {vista === "form-usuario" && (
        <section>
          <FormUsuario />
        </section>
      )}

    </div>
  );
}
