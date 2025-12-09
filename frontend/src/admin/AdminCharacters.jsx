import { useEffect, useState } from "react";

export default function AdminCharacters() {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    const res = await fetch("http://localhost:5000/api/characters");
    const data = await res.json();
    setCharacters(data);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div>
      <h1>Characters</h1>
      <a href="/characters/create" className="admin-btn-create">Create Character</a>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Rank</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {characters.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.gender}</td>
              <td>{c.rank?.join(", ")}</td>
              <td>
                <a href={`/characters/update/${c._id}`} className="admin-btn-edit">Edit</a>
                <a href={`/characters/delete/${c._id}`} className="admin-btn-delete">Delete</a>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
