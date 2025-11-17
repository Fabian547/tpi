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
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "15px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      borderRadius: "10px"
    }}>
      
      {/* LOCAL */}
      <div style={{ textAlign: "center" }}>
        <img src={partido.local.escudo} width={50} alt="" />
        <p>{partido.local.nombre}</p>
      </div>

      {/* RESULTADO */}
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={resultado}
          onChange={(e) => setResultado(e.target.value)}
          style={{ width: "60px", textAlign: "center", marginBottom: "5px" }}
        />

        <div>
          <button onClick={() => onModificarResultado(partido.id, resultado)}>
            Modificar resultado
          </button>
        </div>

        <div style={{ marginTop: "5px" }}>
          <button onClick={() => onEliminar(partido.id)}>
            Eliminar
          </button>
        </div>
      </div>

      {/* VISITANTE */}
      <div style={{ textAlign: "center" }}>
        <img src={partido.visitante.escudo} width={50} alt="" />
        <p>{partido.visitante.nombre}</p>
      </div>

      {/* BOTONES DE ESTADO */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <button onClick={() => onTerminar(partido.id)}>
          Terminado
        </button>

        <button onClick={() => onNoTerminar(partido.id)}>
          No terminado
        </button>
      </div>
    </div>
  );
}
