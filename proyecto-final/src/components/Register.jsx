import React, { useState } from "react";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    nombre: "", apellido: "", usuario: "", clave: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setError("");
    const { nombre, apellido, usuario, clave } = form;
    if (!nombre || !apellido || !usuario || !clave) {
      setError("Completa todos los campos.");
      return;
    }
    try {
      onRegister({ nombre, apellido, usuario, clave });
      setForm({ nombre: "", apellido: "", usuario: "", clave: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Crear cuenta</h2>
      <form onSubmit={submit}>
        <div className="row">
          <div>
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
          </div>
          <div>
            <label>Apellido</label>
            <input name="apellido" value={form.apellido} onChange={handleChange} />
          </div>
        </div>
        <label>Usuario</label>
        <input name="usuario" value={form.usuario} onChange={handleChange} placeholder="ej. jcruz23" />
        <label>Clave</label>
        <input type="password" name="clave" value={form.clave} onChange={handleChange} />
        {error && <p style={{ color: "#d33" }}>{error}</p>}
        <button className="btn" type="submit">Registrarme ✨</button>
      </form>
    </div>
  );
}