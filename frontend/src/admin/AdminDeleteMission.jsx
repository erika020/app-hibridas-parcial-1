import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/missions/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/missions");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Mission</h1>
      <p>¿Eliminar esta misión?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/missions")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteMission;
