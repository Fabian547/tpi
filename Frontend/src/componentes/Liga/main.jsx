import React from "react";

// Importar los main internos
import Jornadas from "./Jornadas/main";
import JornadasAdmin from "./Jornadas-Admin/main";
import Tabla from "./Tabla";

const Liga = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-10">

      {/* Jornadas para usuarios */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Jornadas</h1>
        <Jornadas />
      </section>

      {/* Jornadas para administradores */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Gestión de Jornadas (Admin)</h1>
        <JornadasAdmin />
      </section>

      {/* Tabla de posiciones */}
      <section>
        <h1 className="text-3xl font-bold mb-4">Tabla de Posiciones</h1>
        <Tabla />
      </section>

    </div>
  );
};

export default Liga;
