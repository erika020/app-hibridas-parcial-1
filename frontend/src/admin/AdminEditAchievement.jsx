import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditAchievement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/achievement/${id}`;

  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    loadAchievement();
  }, []);

  const loadAchievement = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setAchievement(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAchievement((prev) => ({ ...prev, [name]: value }));
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
      body: JSON.stringify(achievement),
    });

    navigate("/admin/achievements");
  };

  if (!achievement) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Achievement</h1>

      <input name="name" value={achievement.name} onChange={handleChange} />
      <textarea name="description" value={achievement.description} onChange={handleChange} />
      <input name="points" value={achievement.points} onChange={handleChange} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditAchievement;
