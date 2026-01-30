import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [usersList, setUsersList] = useState([]);
  const [token, setToken] = useState("");
  
  // 1. NUEVOS ESTADOS PARA EL FORMULARIO
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("user_token");
    if (!savedToken) navigate('/');
    else setToken(savedToken);
  }, [navigate]);

  // Reutilizamos esta función para refrescar la lista
  const handleGetUsers = async () => {
    /* ... (copia tu lógica de GET aquí o déjala como estaba) ... */
    // Solo asegúrate de que use la variable 'token' o 'savedToken'
    // RECOMENDACIÓN: Usa localStorage.getItem("user_token") directo dentro del fetch
    // para evitar problemas de sincronización de estado.
    const t = localStorage.getItem("user_token");
    const response = await fetch('https://serverpy.vercel.app/users', {
        headers: { 'Authorization': t }
    });
    const data = await response.json();
    if(response.ok) setUsersList(data.users);
  };

  // --- TU TAREA: COMPLETA ESTA FUNCIÓN ---
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const t = localStorage.getItem("user_token");

    // TAREA 1: Haz el fetch POST a 'http://localhost:5000/users'
    // Body debe llevar: { name: newName, email: newEmail }
    // Headers debe llevar: Content-Type y Authorization
    const response = await fetch('https://serverpy.vercel.app/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': _______
        },
        body: JSON.stringify({ name: _______, email: _______ })
    });

    if (response.ok) {
        alert("Usuario creado!");
        // TAREA 2: Limpia los inputs (pon newName y newEmail en blanco)
        setNewName("");
        setNewEmail("");
        
        // TAREA 3: Recarga la lista automáticamente para ver al nuevo usuario
        handleGetUsers(); 
    }
  };

  const handleLogout = () => { /* ... lo mismo de antes ... */ };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Control</h1>
      
      {/* --- NUEVO FORMULARIO DE CREACIÓN --- */}
      <div style={{ background: "#f0f0f0", padding: "15px", marginBottom: "20px" }}>
        <h3>Agregar Usuario</h3>
        <form onSubmit={handleCreateUser}>
            <input 
                placeholder="Nombre"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <input 
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <button type="submit">Crear</button>
        </form>
      </div>

      <button onClick={handleGetUsers}>Refrescar Lista</button>
      
      <ul>
        {usersList.map((u) => (
           <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}