import { useEffect, useState } from "react";

export default function AdminMissions() {
  const [missions, setMissions] = useState([]);

  const fetchMissions = async () => {
    const res = await fetch("http://localhost:5000/api/missions");
    const data = await res.json();
    setMissions(data);
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  return (
    <div>
      <h1>Missions</h1>
      <a href="/admin/missions/create" className="admin-btn-create">Create Mission</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Place</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {missions.map((ms) => (
            <tr key={ms._id}>
              <td>{ms.name}</td>
              <td>{ms.team}</td>
              <td>{ms.place}</td>
              <td>
                <a href={`/admin/missions/edit/${ms._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/admin/missions/delete/${ms._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
