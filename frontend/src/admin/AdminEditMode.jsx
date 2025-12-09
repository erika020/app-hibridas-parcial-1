import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/mode/${id}`;

  const [mode, setMode] = useState(null);

  useEffect(() => {
    loadMode();
  }, []);

  const loadMode = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setMode(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMode((prev) => ({ ...prev, [name]: value }));
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
      body: JSON.stringify(mode),
    });

    navigate("/admin/modes");
  };

  if (!mode) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Mode</h1>

      <input name="name" value={mode.name} onChange={handleChange} />
      <textarea name="description" value={mode.description} onChange={handleChange} />
      <textarea name="rules" value={mode.rules} onChange={handleChange} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditMode;
