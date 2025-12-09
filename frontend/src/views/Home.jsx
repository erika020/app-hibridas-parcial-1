import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Home = () => {
  const API = "http://localhost:5000/api";
  const { user, token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [weapons, setWeapons] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [maps, setMaps] = useState([]);
  const [missions, setMissions] = useState([]);
  const [modes, setModes] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const fetchData = async (endpoint, setter) => {
    try {
      const resp = await fetch(`${API}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await resp.json();
      if (resp.ok) setter(data);
      else setter([]);

    } catch (error) {
      console.error(`Error loading ${endpoint}`, error);
      setter([]);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([
        fetchData("weapons", setWeapons),
        fetchData("characters", setCharacters),
        fetchData("maps", setMaps),
        fetchData("missions", setMissions),
        fetchData("mode", setModes),
        fetchData("achievement", setAchievements),
      ]);

      setLoading(false);
    };

    loadAll();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="container">

    {user && (
      <section className="create-links">
          <Link to="/weapons/create" className="btn btn-primary">
            + Create weapon
          </Link>
          <Link to="/characters/create" className="btn btn-primary">
            + Create character
          </Link>
          <Link to="/maps/create" className="btn btn-primary">
            + Create map
          </Link>
          <Link to="/missions/create" className="btn btn-primary">
            + Create mission
          </Link>
          <Link to="/mode/create" className="btn btn-primary">
            + Create mode
          </Link>
          <Link to="/achievement/create" className="btn btn-primary">
            + Create achievement
          </Link>
        </section>
        )}

      <div className="dashboard-grid">

        <section className="dash-card">
          <h2>Weapons ({weapons.length})</h2>
          <ul>
            {weapons.slice(0, 3).map(w => (
              <li key={w._id}>{w.name}</li>
            ))}
          </ul>
          <Link to="/weapons" className="btn">View all</Link>
        </section>

        <section className="dash-card">
          <h2>Characters ({characters.length})</h2>
          <ul>
            {characters.slice(0, 3).map(c => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>
          <Link to="/characters" className="btn">View all</Link>
        </section>

        <section className="dash-card">
          <h2>Maps ({maps.length})</h2>
          <ul>
            {maps.slice(0, 3).map(m => (
              <li key={m._id}>{m.name}</li>
            ))}
          </ul>
          <Link to="/maps" className="btn">View all</Link>
        </section>

        <section className="dash-card">
          <h2>Missions ({missions.length})</h2>
          <ul>
            {missions.slice(0, 3).map(m => (
              <li key={m._id}>{m.name}</li>
            ))}
          </ul>
          <Link to="/missions" className="btn">View all</Link>
        </section>

        <section className="dash-card">
          <h2>Modes ({modes.length})</h2>
          <ul>
            {modes.slice(0, 3).map(md => (
              <li key={md._id}>{md.name}</li>
            ))}
          </ul>
          <Link to="/mode" className="btn">View all</Link>
        </section>

        <section className="dash-card">
          <h2>Achievements ({achievements.length})</h2>
          <ul>
            {achievements.slice(0, 3).map(a => (
              <li key={a._id}>{a.name}</li>
            ))}
          </ul>
          <Link to="/achievement" className="btn">View all</Link>
        </section>

      </div>
    </main>
  );
};

export default Home;