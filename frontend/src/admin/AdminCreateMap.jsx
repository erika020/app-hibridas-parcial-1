import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateMap = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/maps";

  const [form, setForm] = useState({
    name: "",
    teams: "",
    location: "",
    date: "",
    terrain: "",
    modes: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    const payload = {
      ...form,
      teams: form.teams.split(",")
    };

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    navigate("/admin/maps");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Map</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="teams" placeholder="Teams (comma separated)" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />
      <input name="terrain" placeholder="Terrain" onChange={handleChange} />
      <input name="modes" placeholder="Modes" onChange={handleChange} />

      <button type="submit">Create Map</button>
    </form>
  );
};

export default AdminCreateMap;
