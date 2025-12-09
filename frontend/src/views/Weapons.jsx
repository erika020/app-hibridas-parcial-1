import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Weapons = () => {
  const api = "http://localhost:5000/api/weapons";

  const { user } = useContext(AuthContext);

  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    getWeapons();
  }, []);

  const getWeapons = async () => {
    try {
      const resp = await fetch(api);
      const data = await resp.json();
      setWeapons(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar armas");
    }
  };
  
  return (
    <main className="container">
      <h1>Weapons</h1>

      <section className="lista">
        {weapons.map((w) => (
          <div key={w._id} className="card">
            <h3>{w.name}</h3>
            <p>{w.description}</p>

            {w.image && <img src={w.image} width="150" />}

            <ul>
              <li>Class: {w.features.weaponClass}</li>
              <li>Damage: {w.features.damage}</li>
              <li>Caliber: {w.features.caliber}</li>
            </ul>

          { user && (
            <div className="card-actions">
              <Link to={`/weapons/update/${w._id}`} className="btn-card btn-edit">
                Edit
              </Link>

              <Link to={`/weapons/delete/${w._id}`} className="btn-card btn-delete">
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

export default Weapons;