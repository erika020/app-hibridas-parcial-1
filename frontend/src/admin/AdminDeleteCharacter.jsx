import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/characters/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/characters");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Character</h1>
      <p>¿Eliminar este personaje?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/characters")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteCharacter;
