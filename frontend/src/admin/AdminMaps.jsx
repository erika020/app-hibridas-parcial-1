import { useEffect, useState } from "react";

export default function AdminMaps() {
  const [maps, setMaps] = useState([]);

  const fetchMaps = async () => {
    const res = await fetch("http://localhost:5000/api/maps");
    const data = await res.json();
    setMaps(data);
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  return (
    <div>
      <h1>Maps</h1>
      <a href="/maps/create" className="admin-btn-create">Create Map</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Terrain</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {maps.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.location}</td>
              <td>{m.terrain}</td>
              <td>
                <a href={`/maps/update/${m._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/maps/delete/${m._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
