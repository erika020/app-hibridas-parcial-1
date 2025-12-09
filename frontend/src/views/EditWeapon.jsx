import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CreateWeaponForm from "../components/CreateWeaponForm";
import Loading from "../components/Loading";

export default function EditWeapon() {
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
        const res = await fetch(`http://localhost:5000/api/weapons/${id}`, {
          headers: { Accept: "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.msg || "No encontrado");

        if (!mounted) return;

        const features = typeof json.features === "string" ? JSON.parse(json.features) : (json.features || {});
        setInitialData({
          name: json.name ?? "",
          description: json.description ?? "",
          image: json.image ?? "",
          features: {
            weaponClass: features.weaponClass ?? "",
            damage: features.damage ?? "",
            caliber: features.caliber ?? "",
            fireRate: features.fireRate ?? "",
            startAmmo: features.startAmmo ?? "",
            maxAmmo: features.maxAmmo ?? "",
            reloadTime: features.reloadTime ?? "",
            recoil: features.recoil ?? ""
          }
        });
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Error cargando weapon");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, token]);

  const handleUpdate = async (payload) => {
    const res = await fetch(`http://localhost:5000/api/weapons/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || "Error actualizando");
    navigate("/weapons");
    return json;
  };

  if (loading) return <Loading />;

  return (
    <div className="container">
      <h1 className="view-title">Edit Weapon</h1>
      <CreateWeaponForm initialData={initialData} onSubmit={handleUpdate} submitLabel="Save" />
    </div>
  );
}
