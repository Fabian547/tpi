import { useState, useEffect } from "react";
import axios from "axios";

export const useDatosFutbol = () => {
  const [equipos, setEquipos] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equiposRes, jornadasRes, partidosRes] = await Promise.all([
          axios.get("http://localhost:9000/equipos"),
          axios.get("http://localhost:9000/jornadas"),
          axios.get("http://localhost:9000/partidos"),
        ]);
        setEquipos(equiposRes.data);
        setJornadas(jornadasRes.data);
        setPartidos(partidosRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const crearPartido = async (data) => {
    await axios.post("http://localhost:9000/partidos", data);
  };

  const crearJornada = async (data) => {
    await axios.post("http://localhost:9000/jornadas", data);
  };

  const modificarPartido = async (id, data) => {
    await axios.put(`http://localhost:9000/partidos/${id}`, data);
  };

  return { equipos, jornadas, partidos, loading, crearPartido, crearJornada, modificarPartido };
};
