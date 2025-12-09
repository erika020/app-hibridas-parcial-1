import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CreateCharacterForm from "../components/CreateCharacterForm";
import Loading from "../components/Loading";

export default function EditCharacter() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/characters/${id}`, {
          headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.msg || "No encontrado");

        if (!mounted) return;

        const rank = Array.isArray(json.rank) ? json.rank : (json.rank ? [json.rank] : []);
        const weapons = Array.isArray(json.weapons) ? json.weapons : (json.weapons ? [json.weapons] : []);
        const equipment = Array.isArray(json.equipment) ? json.equipment : (json.equipment ? [json.equipment] : []);

        setInitialData({
          name: json.name ?? "",
          description: json.description ?? "",
          rank,
          gender: json.gender ?? "",
          weapons,
          equipment,
          image: json.image ?? ""
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Error cargando character");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, token]);

  const handleUpdate = async (payload) => {
    const res = await fetch(`http://localhost:5000/api/characters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error actualizando");
    navigate("/characters");
    return json;
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="view-title">Edit Character</h1>
      <CreateCharacterForm initialData={initialData} onSubmit={handleUpdate} submitLabel="Save" />
    </div>
  );
}
