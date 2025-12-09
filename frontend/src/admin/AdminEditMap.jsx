import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditMap = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/maps/${id}`;

  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setMapData(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMapData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value) => {
    const updated = [...mapData.teams];
    updated[index] = value;
    setMapData((prev) => ({ ...prev, teams: updated }));
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
      body: JSON.stringify(mapData),
    });

    navigate("/admin/maps");
  };

  if (!mapData) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Map</h1>

      <input name="name" value={mapData.name} onChange={handleChange} />
      <input name="location" value={mapData.location} onChange={handleChange} />
      <input name="terrain" value={mapData.terrain} onChange={handleChange} />
      <input name="modes" value={mapData.modes} onChange={handleChange} />

      <label>Date</label>
      <input
        type="date"
        name="date"
        value={mapData.date?.substring(0, 10)}
        onChange={handleChange}
      />

      <h3>Teams</h3>
      {mapData.teams.map((team, i) => (
        <input
          key={i}
          value={team}
          onChange={(e) => handleArrayChange(i, e.target.value)}
        />
      ))}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditMap;
