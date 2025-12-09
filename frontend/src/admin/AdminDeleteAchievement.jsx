import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteAchievement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/achievement/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/achievements");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Achievement</h1>
      <p>¿Eliminar este logro?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/achievements")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteAchievement;
