import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import LoveForm from "./components/LoveForm";
import LoveList from "./components/LoveList";

function App() {
  const [user, setUser] = useState(null); // Usuario logueado
  const [declarations, setDeclarations] = useState([]); // Lista de confesiones

  return (
    <div style={{ textAlign: "center", marginTop: "30px", color: "#ff69b4" }}>
      <h1>💌 Bienvenido a ITLA Crush 💌</h1>
      <p>¡Tu aplicación para unir corazones ITLASIANOS está lista para comenzar!</p>

      {!user && (
        <>
          <Register setUser={setUser} />
          <Login setUser={setUser} />
        </>
      )}

      {user && (
        <>
          <h2>Hola, {user.nombre} ❤️</h2>
          <LoveForm user={user} setDeclarations={setDeclarations} />
        </>
      )}

      <LoveList declarations={declarations} />
    </div>
  );
}

export default App;