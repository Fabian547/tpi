import React, { useState } from "react";
import "./login.css";

export default function Registrar({ onRegister, onIrALogin, error }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errorLocal, setErrorLocal] = useState("");

  function handleRegistrar() {
    if (contrasena !== confirmar) {
      setErrorLocal("Las contraseñas no coinciden");
      return;
    }
    setErrorLocal("");
    onRegister && onRegister({ usuario, contrasena });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Registro de Usuario</h1>

        <label className="login-label">Usuario</label>
        <input
          type="text"
          placeholder="Ingresa tu usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="login-input"
        />

        <label className="login-label">Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="login-input"
        />

        <label className="login-label">Confirmar contraseña</label>
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          className="login-input"
        />

        {/* Errores */}
        {errorLocal && <p style={{ color: "red" }}>{errorLocal}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="login-buttons">
          <button className="login-button" onClick={handleRegistrar}>
            Registrarse
          </button>
          <button className="login-button" onClick={onIrALogin}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}