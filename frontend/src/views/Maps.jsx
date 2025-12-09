import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Maps = () => {
  const api = "http://localhost:5000/api/maps";

  const { user } = useContext(AuthContext);

  const [maps, setMaps] = useState([]);

  useEffect(() => {
    getMaps();
  }, []);

  const getMaps = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setMaps(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar mapas");
    }
  };

  return (
    <main className="container">
      <h1>Maps</h1>

      <section className="lista">
        {maps.map((m) => (
          <div key={m._id} className="card">
            <h3>{m.name}</h3>
            <p>Location: {m.location}</p>
            <p>Terrain: {m.terrain}</p>
            <p>Modes: {m.modes}</p>
            <p>Date: {new Date(m.date).toLocaleDateString()}</p>

            { user &&  (
            <div className="card-actions">
                <Link to={`/maps/update/${m._id}`} className="btn-card btn-edit">
                  Edit
                </Link>

                <Link to={`/maps/delete/${m._id}`} className="btn-card btn-delete">
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

export default Maps;