import { useEffect, useState } from "react";
import "./public-liga.css";

export default function PublicLiga({ onSelectLiga }) {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    const cargarLigas = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/ligas/publicas");
        const data = await res.json();
        setLigas(data);
      } catch (error) {
        console.log("Error cargando ligas públicas:", error);
      }
    };

    cargarLigas();
  }, []);

  return (
    <div className="public-liga-container">

      <h1 className="public-liga-titulo">Ligas</h1>

      <div className="public-liga-lista">

        {ligas.map((liga) => (
          <div
            key={liga.id}
            className="public-liga-card"
            onClick={() => onSelectLiga(liga.id)}
          >
            <h2>{liga.nombre}</h2>
            <p className="public-liga-autor">Autor: {liga.autor}</p>
          </div>
        ))}

      </div>

    </div>
  );
}
