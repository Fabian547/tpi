import { useState } from "react";

export default function TarjetaPartido({
  partido,
  onModificarResultado,
  onEliminar,
  onTerminar,
  onNoTerminar
}) {

  const [resultado, setResultado] = useState(partido.resultado);

  return (
    <div className="TarjetaPartido" style={{
    }}>
      
      {/* LOCAL */}
      <div className="equipo">
        <img src={partido.local.escudo} width={50} alt="" />
        <p>{partido.local.nombre}</p>
      </div>

      {/* RESULTADO */}
      <div className="resultado">
        <input
          type="text"
          value={resultado}
          onChange={(e) => setResultado(e.target.value)}
        />

        <div>
          <button className="button-verde"
          onClick={() => onModificarResultado(partido.id, resultado)}>
            Modificar resultado
          </button>
        </div>

        <div>
          <button className="button-rojo"
          onClick={() => onEliminar(partido.id)}>
            Eliminar
          </button>
        </div>
      </div>

      {/* VISITANTE */}
      <div className="equipo">
        <img src={partido.visitante.escudo} width={50} alt="" />
        <p>{partido.visitante.nombre}</p>
      </div>

      {/* BOTONES DE ESTADO */}
      <div>
        <button className="button-verde"
         onClick={() => onTerminar(partido.id)}>
          Terminado
        </button>

        <button className="button-rojo"
         onClick={() => onNoTerminar(partido.id)}>
          No terminado
        </button>
      </div>
    </div>
  );
}
