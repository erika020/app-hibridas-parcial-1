import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [rol, setRol] = useState("user");

  const API = `http://localhost:5000/api/user/${id}`;

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setUser(data);
    setRol(data.rol);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rol }),
    });

    navigate("/admin/users");
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Editar Rol</h1>

      <p>Usuario: {user.name}</p>

      <label>Rol</label>
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default AdminEditUser;
