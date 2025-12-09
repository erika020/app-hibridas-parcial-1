import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  const endpoint = "http://localhost:5000/api/user";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const resp = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const json = await resp.json();

      if (!resp.ok) {
        console.error("Error:", json);
        return;
      }

      setUsers(json);

    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Usuarios Registrados</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4">No hay usuarios encontrados</td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>

                <td>
                  <Link to={`/admin/users/edit/${u._id}`} className="admin-btn-edit">
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
