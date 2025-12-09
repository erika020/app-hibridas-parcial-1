import React from "react";

export default function WeaponForm({ initialData, onSubmit, submitLabel = "Save" }) {
    const [formData, setFormData] = React.useState(() => initialData ?? {
        name: "",
        description: "",
        image: "",
        features: {
            weaponClass: "",
            damage: "",
            caliber: "",
            fireRate: "",
            startAmmo: "",
            maxAmmo: "",
            reloadTime: "",
            recoil: ""
        }
    });
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("features.")) {
        const key = name.split(".")[1];
        setFormData(prev => ({ ...prev, features: { ...prev.features, [key]: value } }));
        } else {
        setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err?.message || "Error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={submit} className="form-card weapon-form"
        style={{ display: "grid", gap: 12 }}>

            <label className="field">
                <span className="field-label">Name</span>
                <input name="name" className="input" value={formData.name} onChange={handleChange} required />
            </label>

            <label className="field">
                <span className="field-label">Description</span>
                <textarea name="description" className="textarea" rows={3} value={formData.description} onChange={handleChange} />
            </label>

            <label className="field">
                <span className="field-label">Image (URL)</span>
                <input name="image" className="input" value={formData.image} onChange={handleChange} />
            </label>

            { formData.image && <img src={formData.image} className="img-preview" alt="preview" /> }

            <h3 style={{ color: "var(--accent)" }}>Features</h3>
            <div className="features-grid">
                {Object.keys(formData.features).map(k => (
                <label key={k} className="field">
                    <span className="field-label">{k}</span>
                    <input name={`features.${k}`} className="input" value={formData.features[k]} onChange={handleChange} />
                </label>
                ))}
            </div>

            {error && <p style={{ color: "#ff8080" }}>{error}</p>}

            <div className="form-actions">
                <button type="submit" className="btn" disabled={saving}>
                {saving ? "Procesando..." : submitLabel}
                </button>
            </div>
        </form>
    );
}