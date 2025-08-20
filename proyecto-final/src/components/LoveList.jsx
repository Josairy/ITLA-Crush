import React from "react";

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return "";
  }
}

export default function LoveList({ title, items, emptyText, locked = false }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className={locked ? "locked" : ""}>
        {items.length === 0 ? (
          <p className="muted">{emptyText}</p>
        ) : (
          items.map((d) => (
            <div className="declaration" key={d.id}>
              <div className="meta">
                <span className="badge">{d.publico ? "Pública 🌟" : "Privada 🔒"}</span>
                &nbsp;• {fmtDate(d.fecha)}
              </div>
              <p>
                <span className="to">Para: {d.destinatario}</span>
                <br />
                <span>{d.mensaje}</span>
              </p>
              <div className="from">— {d.remitente}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}