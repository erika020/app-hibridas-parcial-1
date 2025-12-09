import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateAchievementForm from "../components/CreateAchievementForm";
import { AuthContext } from "../context/AuthContext";

export default function CreateAchievement() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch("http://localhost:5000/api/achievement", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error creando achievement");
    navigate("/achievement");
    return json;
  };

  return (
    <div className="container">
      <h1 className="view-title">Create Achievement</h1>
      <CreateAchievementForm onSubmit={handleCreate} submitLabel="Create Achievement" />
    </div>
  );
}
