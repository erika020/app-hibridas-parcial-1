import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateWeapon = () => {
  const navigate = useNavigate();
  const API = "http://localhost:5000/api/weapons";

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    features: {
      weaponClass: "",
      damage: "",
      caliber: "",
      fireRate: "",
      startAmmo: "",
      maxAmmo: "",
      reloadTime: "",
      recoil: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (form.features.hasOwnProperty(name)) {
      setForm({
        ...form,
        features: { ...form.features, [name]: value }
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

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

    navigate("/admin/weapons");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Weapon</h1>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />

      <h3>Features</h3>
      {Object.keys(form.features).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          onChange={handleChange}
        />
      ))}

      <button type="submit">Create Weapon</button>
    </form>
  );
};

export default AdminCreateWeapon;
