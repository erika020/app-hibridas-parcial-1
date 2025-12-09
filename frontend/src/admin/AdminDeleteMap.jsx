import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/maps/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/maps");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Map</h1>
      <p>¿Seguro que deseas eliminar este mapa?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/maps")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteMap;
