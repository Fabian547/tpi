import React, { useState } from "react";
import "./login.css"; // reutilizamos el mismo CSS del login

export default function Registro({ onRegister, onIrALogin }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Registro de Usuario</h1>

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

        {/* Confirmación */}
        <label className="login-label">Confirmar contraseña</label>
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          className="login-input"
        />

        {/* Botones */}
        <div className="login-buttons">
          <button
            className="login-button"
            onClick={() =>
              onRegister &&
              onRegister({
                usuario,
                contrasena,
                confirmar,
              })
            }
          >
            registrarse
          </button>

          <button
            className="login-button"
            onClick={() => onIrALogin && onIrALogin()}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
