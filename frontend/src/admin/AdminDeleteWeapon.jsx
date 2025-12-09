import { useNavigate, useParams } from "react-router-dom";

const AdminDeleteWeapon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/weapons/${id}`;

  const handleDelete = async () => {
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    navigate("/admin/weapons");
  };

  return (
    <div className="admin-delete">
      <h1>Delete Weapon</h1>
      <p>¿Estás seguro de que deseas eliminar esta Weapon?</p>

      <button className="btn-danger" onClick={handleDelete}>Eliminar</button>
      <button className="btn-cancel" onClick={() => navigate("/admin/weapons")}>Cancelar</button>
    </div>
  );
};

export default AdminDeleteWeapon;
