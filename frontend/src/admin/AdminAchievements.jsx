import { useEffect, useState } from "react";

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const res = await fetch("http://localhost:5000/api/achievement");
    const data = await res.json();
    setAchievements(data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div>
      <h1>Achievements</h1>
      <a href="/achievement/create" className="admin-btn-create">Create Achievement</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {achievements.map((ac) => (
            <tr key={ac._id}>
              <td>{ac.name}</td>
              <td>{ac.points}</td>
              <td>
                <a href={`/achievement/update/${ac._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/achievement/delete/${ac._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
