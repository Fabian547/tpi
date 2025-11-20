import "./TarjetaPartidoUsuario.css";

export default function TarjetaPartidoUsuario({ partido }) {
  return (
    <div className="tarjeta-partido-usuario">
      
      {/* LOCAL */}
      <div className="equipo">
        <img src={partido.local.escudo} alt="" />
        <p>{partido.local.nombre}</p>
      </div>

      {/* RESULTADO */}
      <div className="resultado">
        {partido.estado === 1 ? (
          <strong>{partido.resultado}</strong>
        ) : (
          <span className="no-jugado">No jugado</span>
        )}
      </div>

      {/* VISITANTE */}
      <div className="equipo">
        <img src={partido.visitante.escudo} alt="" />
        <p>{partido.visitante.nombre}</p>
      </div>

    </div>
  );
}
