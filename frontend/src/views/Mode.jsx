import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Modes = () => {
  const api = "http://localhost:5000/api/mode";

  const [modes, setModes] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getModes();
  }, []);

  const getModes = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setModes(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar modos");
    }
  };

  return (
    <main className="container">
      <h1>Modes</h1>

      <section className="lista">
        {modes.map((m) => (
          <div key={m._id} className="card">
            <h3>{m.name}</h3>
            <p>{m.description}</p>
            <p>Rules: {m.rules}</p>

          { user && (
            <div className="card-actions">
              <Link to={`/mode/update/${m._id}`} className="btn-card btn-edit">
                Edit
              </Link>

              <Link to={`/mode/delete/${m._id}`} className="btn-card btn-delete">
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

export default Modes;