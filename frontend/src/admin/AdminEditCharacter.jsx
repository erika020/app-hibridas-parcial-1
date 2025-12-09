import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/characters/${id}`;

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setCharacter(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...character[field]];
    updated[index] = value;
    setCharacter((prev) => ({ ...prev, [field]: updated }));
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
      body: JSON.stringify(character),
    });

    navigate("/admin/characters");
  };

  if (!character) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Character</h1>

      <input name="name" value={character.name} onChange={handleChange} />
      <textarea name="description" value={character.description} onChange={handleChange} />

      <h3>Rank</h3>
      {character.rank.map((r, i) => (
        <input
          key={i}
          value={r}
          onChange={(e) => handleArrayChange("rank", i, e.target.value)}
        />
      ))}

      <label>Gender</label>
      <select name="gender" value={character.gender} onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <h3>Weapons</h3>
      {character.weapons.map((w, i) => (
        <input
          key={i}
          value={w}
          onChange={(e) => handleArrayChange("weapons", i, e.target.value)}
        />
      ))}

      <h3>Equipment</h3>
      {character.equipment.map((eq, i) => (
        <input
          key={i}
          value={eq}
          onChange={(e) => handleArrayChange("equipment", i, e.target.value)}
        />
      ))}

      <input name="image" value={character.image} onChange={handleChange} />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditCharacter;
