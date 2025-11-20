import React, { useState } from "react";
import "./login.css"; // importar los estilos separados

export default function Login({ onLogin, onRegister }) {
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

        {/* Botones */}
        <div className="login-buttons">
          <button
            onClick={() => onRegister && onRegister()}
            className="login-button"
          >
            registrarse
          </button>

          <button
            onClick={() => onLogin && onLogin(usuario, contrasena)}
            className="login-button"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
