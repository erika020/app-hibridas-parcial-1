import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateMission = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/missions";

  const [form, setForm] = useState({
    name: "",
    plot: "",
    team: "",
    enemies: "",
    place: "",
    objective: "",
    date: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    const payload = {
      ...form,
      enemies: form.enemies.split(",")
    };

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    navigate("/admin/missions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Mission</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="plot" placeholder="Plot" onChange={handleChange} />
      <input name="team" placeholder="Team" onChange={handleChange} />
      <input name="enemies" placeholder="Enemies (comma separated)" onChange={handleChange} />
      <input name="place" placeholder="Place" onChange={handleChange} />
      <input name="objective" placeholder="Objective" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} />

      <button type="submit">Create Mission</button>
    </form>
  );
};

export default AdminCreateMission;
