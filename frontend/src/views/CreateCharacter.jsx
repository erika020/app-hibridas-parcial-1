import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CreateCharacterForm from "../components/CreateCharacterForm";
import { AuthContext } from "../context/AuthContext";

export default function CreateCharacter() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCreate = async (payload) => {
        const res = await fetch("http://localhost:5000/api/characters", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...(token ? {
                Authorization: `Bearer ${token}`
            } : {}) },
            body: JSON.stringify(payload)
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Error creando character");
            navigate("/characters");
            return json;
        };

    return (
        <div className="container">
        <h1 className="view-title">Create Character</h1>
        <CreateCharacterForm onSubmit={handleCreate} submitLabel="Create Character" />
        </div>
    );
}
