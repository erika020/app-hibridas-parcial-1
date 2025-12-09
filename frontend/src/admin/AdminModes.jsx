import { useEffect, useState } from "react";

export default function AdminModes() {
  const [modes, setModes] = useState([]);

  const fetchModes = async () => {
    const res = await fetch("http://localhost:5000/api/mode");
    const data = await res.json();
    setModes(data);
  };

  useEffect(() => {
    fetchModes();
  }, []);

  return (
    <div>
      <h1>Game Modes</h1>
      <a href="/mode/create" className="admin-btn-create">Create Mode</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rules</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {modes.map((md) => (
            <tr key={md._id}>
              <td>{md.name}</td>
              <td>{md.rules}</td>
              <td>
                <a href={`/mode/update/${md._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/mode/delete/${md._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
