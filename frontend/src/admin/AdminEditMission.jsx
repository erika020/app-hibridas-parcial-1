import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditMission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/missions/${id}`;

  const [mission, setMission] = useState(null);

  useEffect(() => {
    loadMission();
  }, []);

  const loadMission = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setMission(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMission((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value) => {
    const updated = [...mission.enemies];
    updated[index] = value;
    setMission((prev) => ({ ...prev, enemies: updated }));
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
      body: JSON.stringify(mission),
    });

    navigate("/admin/missions");
  };

  if (!mission) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Mission</h1>

      <input name="name" value={mission.name} onChange={handleChange} />
      <textarea name="plot" value={mission.plot} onChange={handleChange} />

      <input name="team" value={mission.team} onChange={handleChange} />

      <h3>Enemies</h3>
      {mission.enemies.map((enemy, i) => (
        <input
          key={i}
          value={enemy}
          onChange={(e) => handleArrayChange(i, e.target.value)}
        />
      ))}

      <input name="place" value={mission.place} onChange={handleChange} />

      <label>Date</label>
      <input
        type="date"
        name="date"
        value={mission.date?.substring(0, 10)}
        onChange={handleChange}
      />

      <input name="objective" value={mission.objective} onChange={handleChange} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditMission;
