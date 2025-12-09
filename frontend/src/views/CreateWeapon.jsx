import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateWeaponForm from "../components/CreateWeaponForm";

export default function CreateWeapon() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch("http://localhost:5000/api/weapons", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ?
        { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error creando");
    navigate("/weapons");
    return json;
  };

  return (
    <div className="container">
      <h1 className="view-title">Create weapon</h1>
      <CreateWeaponForm onSubmit={handleCreate} submitLabel="Create weapon" />
    </div>
  );
}
