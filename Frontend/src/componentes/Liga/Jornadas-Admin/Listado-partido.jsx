import TarjetaPartido from "./TarjetaPartido";

export default function ListadoPartidos({
  partidos,
  modificarResultado,
  eliminarPartido,
  terminarPartido,
  desTerminarPartido
}) {

  return (
    <div className="ListadoPartidos">
      {partidos.map((p) => (
        <TarjetaPartido
          key={p.id}
          partido={p}
          onModificarResultado={modificarResultado}
          onEliminar={eliminarPartido}
          onTerminar={terminarPartido}
          onNoTerminar={desTerminarPartido}
        />
      ))}
    </div>
  );
}
