import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdminEditWeapon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = `http://localhost:5000/api/weapons/${id}`;

  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    loadWeapon();
  }, []);

  const loadWeapon = async () => {
    const token = localStorage.getItem("jwt");

    const resp = await fetch(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await resp.json();
    setWeapon(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("features.")) {
      const key = name.split(".")[1];
      setWeapon((prev) => ({
        ...prev,
        features: { ...prev.features, [key]: value }
      }));
    } else {
      setWeapon((prev) => ({ ...prev, [name]: value }));
    }
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
      body: JSON.stringify(weapon),
    });

    navigate("/admin/weapons");
  };

  if (!weapon) return <p>Cargando...</p>;

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h1>Edit Weapon</h1>

      <input name="name" value={weapon.name} onChange={handleChange} />
      <textarea name="description" value={weapon.description} onChange={handleChange} />

      <input name="image" value={weapon.image} onChange={handleChange} />

      <h3>Features</h3>
      {Object.keys(weapon.features).map((key) => (
        <input
          key={key}
          name={`features.${key}`}
          value={weapon.features[key]}
          onChange={handleChange}
          placeholder={key}
        />
      ))}

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminEditWeapon;
