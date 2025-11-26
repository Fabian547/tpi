import { useState, useEffect } from "react";
import "./App.css";

import Header from "./componentes/Header/main";
import Ligas from "./componentes/Liga/main";
import Formulario from "./componentes/Formulario/main";
import Login from "./componentes/Login/main";
import Footer from "./componentes/Footer/footer";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [rol, setRol] = useState("usuario"); // usuario / admin
  const [vista, setVista] = useState("liga"); // liga | formulario

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("logueado");
    const rolGuardado = localStorage.getItem("rol");

    if (usuarioGuardado === "true") setLogueado(true);
    if (rolGuardado) setRol(rolGuardado);
  }, []);

  // 🟢 Cuando el login es exitoso
  const handleLogin = (userRol) => {
    setLogueado(true);
    setRol(userRol);
    localStorage.setItem("logueado", "true");
    localStorage.setItem("rol", userRol);
  };

  // 🟢 Cuando en el Header se selecciona un formulario
  const handleSelectFormulario = () => {
    setVista("formulario");
  };

  // 🟢 Cuando en el Header el usuario vuelve a la liga
  const handleVolverLiga = () => {
    setVista("liga");
  };

  // 🔴 Si NO está logueado → mostrar solo LOGIN
  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  // 🟢 Ya logueado → mostrar header + contenido + footer
  return (
    <div className="App">

      <Header
        rol={rol}
        onSelectFormulario={handleSelectFormulario}
        onSelectLiga={handleVolverLiga}
      />

      {vista === "liga" && <Ligas rol={rol} />}

      {vista === "formulario" && rol === "admin" && <Formulario />}

      <Footer />
    </div>
  );
}

export default App;
