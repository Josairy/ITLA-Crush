import React, { useEffect, useMemo, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import LoveForm from "./components/LoveForm";
import LoveList from "./components/LoveList";
import "./App.css";

const LS_KEYS = {
  users: "itlaCrush_users",
  declarations: "itlaCrush_declarations",
  currentUser: "itlaCrush_currentUser",
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [declarations, setDeclarations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Cargar desde localStorage
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem(LS_KEYS.users) || "[]");
    const d = JSON.parse(localStorage.getItem(LS_KEYS.declarations) || "[]");
    const cu = JSON.parse(localStorage.getItem(LS_KEYS.currentUser) || "null");
    setUsers(u);
    setDeclarations(d);
    setCurrentUser(cu);
  }, []);

  // Guardar cambios
  useEffect(() => {
    localStorage.setItem(LS_KEYS.users, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.declarations, JSON.stringify(declarations));
  }, [declarations]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.currentUser, JSON.stringify(currentUser));
  }, [currentUser]);

  // Handlers
  const handleRegister = (newUser) => {
    const exists = users.some(
      (u) => u.usuario.trim().toLowerCase() === newUser.usuario.trim().toLowerCase()
    );
    if (exists) throw new Error("Ese usuario ya existe. Intenta con otro.");
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({
      usuario: newUser.usuario,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
    });
  };

  const handleLogin = (usuario, clave) => {
    const found = users.find((u) => u.usuario === usuario && u.clave === clave);
    if (!found) throw new Error("Usuario o clave incorrectos.");
    setCurrentUser({
      usuario: found.usuario,
      nombre: found.nombre,
      apellido: found.apellido,
    });
  };

  const handleLogout = () => setCurrentUser(null);

  const handleAddDeclaration = (payload) => {
    // payload: {mensaje, publico, anonimo, destinatario}
    if (!currentUser) throw new Error("Inicia sesión para publicar.");
    const remitente = payload.anonimo ? "Anónimo 💫" : currentUser.usuario;
    const nueva = {
      id: crypto.randomUUID(),
      remitente,
      destinatario: payload.destinatario,
      mensaje: payload.mensaje,
      publico: payload.publico,
      fecha: new Date().toISOString(),
    };
    setDeclarations((prev) => [nueva, ...prev]);
  };

  // Lista de destinatarios (combobox): todos los usuarios registrados
  const destinatarios = useMemo(
    () =>
      users.map((u) => ({
        value: u.usuario,
        label: `${u.nombre} ${u.apellido} (@${u.usuario})`,
      })),
    [users]
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">💌 ITLA Crush</div>
        <div className="spacer" />
        {currentUser ? (
          <div className="userbox">
            <span>Hola, {currentUser.nombre} ❤️</span>
            <button className="btn ghost" onClick={handleLogout}>Salir</button>
          </div>
        ) : (
          <span className="muted">Modo visitante: ves solo lo público</span>
        )}
      </header>

      {!currentUser && (
        <section className="grid two">
          <Register onRegister={handleRegister} />
          <Login onLogin={handleLogin} />
        </section>
      )}

      {currentUser && (
        <section className="panel">
          <LoveForm
            onSubmit={handleAddDeclaration}
            destinatarios={destinatarios}
          />
        </section>
      )}

      <section className="grid two">
        <LoveList
          title="Declaraciones públicas"
          items={declarations.filter((d) => d.publico)}
          emptyText="Aún no hay declaraciones públicas. ¡Sé la primera chispa!"
        />
        <LoveList
          title="Privadas (solo con sesión)"
          items={currentUser ? declarations.filter((d) => !d.publico) : []}
          emptyText={
            currentUser
              ? "Todavía nada por aquí. Envía una privada y aparece mágicamente ✨"
              : "Inicia sesión para ver las privadas."
          }
          locked={!currentUser}
        />
      </section>

      <footer className="footer">
        Hecho con 💖 por mí (versión demo con LocalStorage)
      </footer>
    </div>
  );
}