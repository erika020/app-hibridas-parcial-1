import { useEffect, useState } from "react";

export default function AdminWeapons() {
  const [weapons, setWeapons] = useState([]);

  const fetchWeapons = async () => {
    const res = await fetch("http://localhost:5000/api/weapons");
    const data = await res.json();
    setWeapons(data);
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  return (
    <div>
      <h1>Weapons</h1>
      <a href="/weapons/create" className="admin-btn-create">Create Weapon</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Damage</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {weapons.map((w) => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{w.features?.damage}</td>
              <td>
                <a href={`/weapons/update/${w._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/weapons/delete/${w._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
