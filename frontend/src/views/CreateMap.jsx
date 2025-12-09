import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateMapForm from "../components/CreateMapForm";
import { AuthContext } from "../context/AuthContext";

export default function CreateMap() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch("http://localhost:5000/api/maps", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error creando map");
    navigate("/maps");
    return json;
  };

  return (
    <div className="container">
      <h1 className="view-title">Create Map</h1>
      <CreateMapForm onSubmit={handleCreate} submitLabel="Create Map" />
    </div>
  );
}
