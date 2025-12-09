import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateMissionForm from "../components/CreateMissionForm";
import { AuthContext } from "../context/AuthContext";

export default function CreateMission() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch("http://localhost:5000/api/missions", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error creando mission");
    navigate("/missions");
    return json;
  };

  return (
    <div className="container">
      <h1 className="view-title">Create Mission</h1>
      <CreateMissionForm onSubmit={handleCreate} submitLabel="Create Mission" />
    </div>
  );
}
