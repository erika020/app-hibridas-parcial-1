import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateAchievement = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/achievement";

  const [form, setForm] = useState({
    name: "",
    description: "",
    points: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    navigate("/admin/achievements");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Achievement</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="points" placeholder="Points" onChange={handleChange} />

      <button type="submit">Create Achievement</button>
    </form>
  );
};

export default AdminCreateAchievement;
