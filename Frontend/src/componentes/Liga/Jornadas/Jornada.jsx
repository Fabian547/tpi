import "./ListadoPartidosUsuario.css";
import TarjetaPartidoUsuario from "./tarjeta";

export default function ListadoPartidosUsuario({ partidos }) {
  return (
    <div className="listado-partidos-usuario">
      {partidos.map((p) => (
        <TarjetaPartidoUsuario key={p.id} partido={p} />
      ))}
    </div>
  );
}
