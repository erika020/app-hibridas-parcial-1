import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Missions = () => {
  const api = "http://localhost:5000/api/missions";

  const { user } = useContext(AuthContext);

  const [missions, setMissions] = useState([]);

  useEffect(() => {
    getMissions();
  }, []);

  const getMissions = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setMissions(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar misiones");
    }
  };

  return (
    <main className="container">
      <h1>Missions</h1>

      <section className="lista">
        {missions.map((m) => (
          <div key={m._id} className="card">
            <h3>{m.name}</h3>
            <p>{m.plot}</p>
            <p>Team: {m.team}</p>
            <p>Enemies: {m.enemies.join(", ")}</p>
            <p>Place: {m.place}</p>
            <p>Objective: {m.objective}</p>

            { user && (
              <div className="card-actions">
                  <Link to={`/missions/update/${m._id}`} className="btn-card btn-edit">
                    Edit
                  </Link>

                  <Link to={`/missions/delete/${m._id}`} className="btn-card btn-delete">
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

export default Missions;