import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook de navegación

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const navigate = useNavigate(); // Inicializamos la herramienta de redirección

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch('https://serverpy.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Guardamos el token
        localStorage.setItem("user_token", data.token);
        // 2. REDIRECCIONAMOS AL DASHBOARD
        navigate('/dashboard'); 
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      setErrorMsg("Error de conexión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario (admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Contraseña (123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <button type="submit">Ingresar</button>
      </form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
}