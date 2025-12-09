import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Achievements = () => {
  const api = "http://localhost:5000/api/achievement";

  const { user } = useContext(AuthContext);

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    getAchievements();
  }, []);

  const getAchievements = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setAchievements(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar logros");
    }
  };

  return (
    <main className="container">
      <h1>Achievements</h1>

      <section className="lista">
        {achievements.map((a) => (
          <div key={a._id} className="card">
            <h3>{a.name}</h3>
            <p>{a.description}</p>
            <p>Points: {a.points}</p>

            {user && (
              <div className="card-actions">
                <Link to={`/achievement/update/${a._id}`} className="btn-card btn-edit">
                  Edit
                </Link>

                <Link to={`/achievement/delete/${a._id}`} className="btn-card btn-delete">
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

export default Achievements;