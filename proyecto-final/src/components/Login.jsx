import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      onLogin(usuario, clave);
      setUsuario(""); setClave("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Iniciar sesión</h2>
      <form onSubmit={submit}>
        <label>Usuario</label>
        <input value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        <label>Clave</label>
        <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} />
        {error && <p style={{ color: "#d33" }}>{error}</p>}
        <button className="btn" type="submit">Entrar 😎</button>
      </form>
    </div>
  );
}