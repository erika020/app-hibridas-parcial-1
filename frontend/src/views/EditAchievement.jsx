import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateAchievementForm from "../components/CreateAchievementForm";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function EditAchievement() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/achievement/${id}`, {
          headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.msg || "No encontrado");
        if (!mounted) return;

        setInitialData({
          name: json.name ?? "",
          description: json.description ?? "",
          points: json.points ?? ""
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
    const res = await fetch(`http://localhost:5000/api/achievement/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error actualizando");
    navigate("/achievement");
    return json;
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="view-title">Edit Achievement</h1>
      <CreateAchievementForm initialData={initialData} onSubmit={handleUpdate} submitLabel="Save" />
    </div>
  );
}
