import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateMode = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/mode";

  const [form, setForm] = useState({
    name: "",
    description: "",
    rules: ""
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

    navigate("/admin/modes");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Mode</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="rules" placeholder="Rules" onChange={handleChange} />

      <button type="submit">Create Mode</button>
    </form>
  );
};

export default AdminCreateMode;
