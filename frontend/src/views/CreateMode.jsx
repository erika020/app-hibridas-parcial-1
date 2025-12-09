import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateModeForm from "../components/CreateModeForm";
import { AuthContext } from "../context/AuthContext";

export default function CreateMode() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch("http://localhost:5000/api/mode", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error creando mode");
    navigate("/mode");
    return json;
  };

  return (
    <div className="container">
      <h1 className="view-title">Create Mode</h1>
      <CreateModeForm onSubmit={handleCreate} submitLabel="Create Mode" />
    </div>
  );
}
