import React, { useMemo, useState } from "react";

export default function LoveForm({ onSubmit, destinatarios }) {
  const [mensaje, setMensaje] = useState("");
  const [publico, setPublico] = useState(true); // por defecto público
  const [anonimo, setAnonimo] = useState(false);
  const [dest, setDest] = useState(""); // value seleccionado
  const [otro, setOtro] = useState("");

  const options = useMemo(
    () => [...destinatarios, { value: "__OTRO__", label: "OTRO (escribir manualmente)" }],
    [destinatarios]
  );

  const submit = (e) => {
    e.preventDefault();
    let destinatario = dest === "__OTRO__" ? otro.trim() : dest;
    if (!destinatario) {
      alert("El destinatario es requerido.");
      return;
    }
    if (!mensaje.trim()) {
      alert("Escribe tu declaración.");
      return;
    }
    onSubmit({ mensaje: mensaje.trim(), publico, anonimo, destinatario });
    setMensaje(""); setAnonimo(false); setPublico(true); setDest(""); setOtro("");
  };

  return (
    <div>
      <h2>Hacer confesión de amor</h2>
      <form onSubmit={submit}>
        <label>Destinatario</label>
        <select value={dest} onChange={(e) => setDest(e.target.value)}>
          <option value="" disabled>Selecciona tu crush</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {dest === "__OTRO__" && (
          <>
            <label>Escribe el nombre de tu crush</label>
            <input value={otro} onChange={(e) => setOtro(e.target.value)} placeholder="Nombre de tu crush" />
          </>
        )}

        <label>Tu declaración</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Aquí suelto el corazón... 💖"
        />

        <div className="row">
          <label className="badge">
            <input
              type="checkbox"
              checked={publico}
              onChange={(e) => setPublico(e.target.checked)}
              style={{ accentColor: "#ff69b4" }}
            />
            Declaración pública (por defecto)
          </label>
          <label className="badge">
            <input
              type="checkbox"
              checked={anonimo}
              onChange={(e) => setAnonimo(e.target.checked)}
              style={{ accentColor: "#ff69b4" }}
            />
            Enviar como anónima
          </label>
        </div>

        <div style={{ marginTop: 10 }}>
          <button className="btn" type="submit">Enviar Confesión 💌</button>
        </div>
      </form>
    </div>
  );
}