import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function DeleteAchievement() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(`http://localhost:5000/api/achievement/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resp.ok) {
        const errJson = await resp.json().catch(()=>({ msg: "Error" }));
        setError(errJson.msg || "Error deleting achievement");
        setLoading(false);
        return;
      }
      navigate("/achievement");
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="container">
      <h1 className="view-title">Delete Achievement</h1>
      <p>Do you want to delete this achievement?</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="div-delete">
        <button className="btn-delete" onClick={handleDelete}>
          Yes, delete
        </button>

        <button className="btn-def" onClick={() => navigate("/achievement")}>
          Cancel
        </button>
      </div>

    </main>
  );
}
