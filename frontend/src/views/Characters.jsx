import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Characters = () => {
  const api = "http://localhost:5000/api/characters";

  const { user } = useContext(AuthContext);

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setCharacters(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar personajes");
    }
  };

  return (
    <main className="container">
      <h1>Characters</h1>

      <section className="lista">
        {characters.map((c) => (
          <div key={c._id} className="card">
            <h3>{c.name}</h3>
            <p>{c.description}</p>

            <p>Gender: {c.gender}</p>
            <p>Rank: {c.rank?.join(", ")}</p>
            <p>Weapons: {c.weapons?.join(", ")}</p>

            {c.image && <img src={c.image} width="150" />}

            {user && (
              <div className="card-actions">
                <Link to={`/characters/update/${c._id}`} className="btn-card btn-edit">
                  Edit
                </Link>

                <Link to={`/characters/delete/${c._id}`} className="btn-card btn-delete">
                  Delete
                </Link>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Characters;