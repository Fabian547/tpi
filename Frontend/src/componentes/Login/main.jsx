import React, { useState } from "react";
import InicioDeSesion from "./Inicio-de-sesion";
import Registrar from "./Registrar";

export default function LoginMain({ onLogin }) {
  const [vista, setVista] = useState("login");
  const [error, setError] = useState("");

  async function handleLogin({ usuario, contrasena }) {
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: usuario, pass: contrasena }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        onLogin(data.rol);
      } else {
        const msg = await response.text();
        setError(msg);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  }

  async function handleRegistro({ usuario, contrasena }) {
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nombre: usuario, Contraseña: contrasena, Rol: "user" }),
      });

      if (response.ok) {
        alert("Usuario registrado correctamente!");
        setVista("login");
      } else {
        const msg = await response.text();
        setError(msg);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  }

  return (
    <div>
      {vista === "login" && (
        <InicioDeSesion
          onLogin={handleLogin}
          onIrARegistro={() => { setError(""); setVista("registro"); }}
          error={error}
        />
      )}

      {vista === "registro" && (
        <Registrar
          onRegister={handleRegistro}
          onIrALogin={() => { setError(""); setVista("login"); }}
          error={error}
        />
      )}
    </div>
  );
}