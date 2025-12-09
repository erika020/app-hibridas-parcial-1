import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateMapForm from "../components/CreateMapForm";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function EditMap() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/maps/${id}`, {
          headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.msg || "No encontrado");
        if (!mounted) return;

        const teams = Array.isArray(json.teams) ? json.teams : (json.teams ? [json.teams] : []);
        setInitialData({
          name: json.name ?? "",
          teams,
          location: json.location ?? "",
          date: json.date ?? null,
          terrain: json.terrain ?? "",
          modes: json.modes ?? ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, token]);

  const handleUpdate = async (payload) => {
    const res = await fetch(`http://localhost:5000/api/maps/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error actualizando");
    navigate("/maps");
    return json;
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="view-title">Edit Map</h1>
      <CreateMapForm initialData={initialData} onSubmit={handleUpdate} submitLabel="Save" />
    </div>
  );
}
