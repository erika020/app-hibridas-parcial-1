import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateCharacter = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/characters";

  const [form, setForm] = useState({
    name: "",
    description: "",
    rank: "",
    gender: "Male",
    weapons: "",
    equipment: "",
    image: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");

    const payload = {
      ...form,
      rank: form.rank.split(","),
      weapons: form.weapons.split(","),
      equipment: form.equipment.split(",")
    };

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    navigate("/admin/characters");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Character</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="rank" placeholder="Rank (comma separated)" onChange={handleChange} />

      <select name="gender" onChange={handleChange}>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input name="weapons" placeholder="Weapons (comma separated)" onChange={handleChange} />
      <input name="equipment" placeholder="Equipment (comma separated)" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />

      <button type="submit">Create Character</button>
    </form>
  );
};

export default AdminCreateCharacter;
