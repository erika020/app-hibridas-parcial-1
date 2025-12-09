import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/mode/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/modes");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Mode</h1>
      <p>¿Eliminar este modo de juego?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/modes")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteMode;
