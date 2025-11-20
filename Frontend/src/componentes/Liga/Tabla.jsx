import React, { useEffect, useState } from "react";

const TablaPosiciones = () => {
  const [posiciones, setPosiciones] = useState([]);

  useEffect(() => {
    const fetchPosiciones = async () => {
      try {
        const res = await fetch("http://localhost:9000/api/posiciones");
        const data = await res.json();

        // Ordenar: 1) Más puntos, 2) Más goles
        const ordenadas = data.sort((a, b) => {
          if (b.pt !== a.pt) return b.pt - a.pt;
          return b.gf - a.gf;
        });

        setPosiciones(ordenadas);
      } catch (error) {
        console.error("Error cargando tabla de posiciones:", error);
      }
    };

    fetchPosiciones();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Tabla de Posiciones</h2>

      {/* Encabezado */}
      <div className="grid grid-cols-5 font-bold border-b pb-2 select-none">
        <span>#</span>
        <span>Equipo</span>
        <span className="text-right">GF</span>
        <span className="text-right">PJ</span>
        <span className="text-right">PT</span>
      </div>

      {/* Filas */}
      {posiciones.map((equipo, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center py-3 border-b"
        >
          {/* Posición */}
          <span className="font-bold">{index + 1}</span>

          {/* Escudo + nombre */}
          <div className="flex items-center gap-2">
            <img
              src={`http://localhost:9000/archivos/escudos/${equipo.escudo}`}
              alt="escudo"
              className="w-8 h-8 object-cover rounded"
            />
            <span className="font-medium">{equipo.nombre}</span>
          </div>

          {/* GF */}
          <span className="text-right font-semibold">{equipo.gf}</span>

          {/* PJ */}
          <span className="text-right font-semibold">{equipo.pj}</span>

          {/* PT */}
          <span className="text-right font-semibold">{equipo.pt}</span>
        </div>
      ))}
    </div>
  );
};

export default TablaPosiciones;
