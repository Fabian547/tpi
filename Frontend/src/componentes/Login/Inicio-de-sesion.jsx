import React, { useState } from "react";
import "./login.css";

export default function InicioDeSesion({ onLogin, onIrARegistro, error }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Inicio de sesión</h1>

        {/* Usuario */}
        <label className="login-label">Usuario</label>
        <input
          type="text"
          placeholder="Ingresa tu usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="login-input"
        />

        {/* Contraseña */}
        <label className="login-label">Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="login-input"
        />

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Botones */}
        <div className="login-buttons">
          <button
            className="login-button"
            onClick={() => onLogin && onLogin({ usuario, contrasena })}
          >
            Iniciar sesión
          </button>

          <button
            className="login-button"
            onClick={onIrARegistro}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}