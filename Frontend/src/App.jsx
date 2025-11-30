import { useState, useEffect } from "react";
import "./App.css";

import Header from "./componentes/Header/main";
import Ligas from "./componentes/Liga/main";
import Formularios from "./componentes/Formulario/main";
import Login from "./componentes/Login/main";
import Footer from "./componentes/Footer/footer";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [rol, setRol] = useState("usuario"); // "usuario" | "admin"
  const [vista, setVista] = useState("liga"); // "liga" | "formulario"
  const [formSeleccionado, setFormSeleccionado] = useState(null); // 👈 agregado del test

  // Cargar usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("logueado");
    const rolGuardado = localStorage.getItem("rol");

    if (usuarioGuardado === "true") setLogueado(true);
    if (rolGuardado) setRol(rolGuardado);
  }, []);

  // ➤ Login exitoso
  const handleLogin = (userRol) => {
    setLogueado(true);
    setRol(userRol);
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", userRol);
  };

  // ➤ Seleccionar formulario desde Header
  const handleSelectFormulario = (formName) => {
    setFormSeleccionado(formName);   // ej: "form-liga"
    setVista("formulario");
  };

  // ➤ Volver a Liga
  const handleVolverLiga = () => {
    setVista("liga");
    setFormSeleccionado(null);
  };

  // 🔴 Mostrar solo login si no está logueado
  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">

      <Header
        rol={rol}
        onSelectFormulario={handleSelectFormulario}
        onSelectLiga={handleVolverLiga}
      />

      {/* Vista Liga (tabla + jornadas) */}
      {vista === "liga" && <Ligas rol={rol} />}

      {/* Vista Formularios (solo admin) */}
      {vista === "formulario" && rol === "admin" && (
        <Formularios vista={formSeleccionado} />
      )}

      <Footer />
    </div>
  );
}

export default App;
