import React from "react";

export default function MapForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [formData, setFormData] = React.useState(() => initialData ?? {
    name: "",
    teams: [],
    location: "",
    date: "",
    terrain: "",
    modes: ""
  });

  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const csvToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return String(val).split(",").map(s => s.trim()).filter(Boolean);
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...formData,
      teams: csvToArray(formData.teams),
      date: formData.date ? new Date(formData.date).toISOString() : null
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err?.message || "Error");
    } finally {
      setSaving(false);
    }
  };

  const teamsValue = Array.isArray(formData.teams) ? formData.teams.join(", ") : formData.teams;

  return (
    <form onSubmit={submit} className="form-card" style={{ display: "grid", gap: 12 }}>
      <label className="field">
        <span className="field-label">Name</span>
        <input name="name" className="input" value={formData.name} onChange={handleChange} required />
      </label>

      <label className="field">
        <span className="field-label">Location</span>
        <input name="location" className="input" value={formData.location} onChange={handleChange} />
      </label>

      <label className="field">
        <span className="field-label">Date</span>
        <input type="date" name="date" className="input" value={formData.date ? formData.date.slice(0,10) : ""} onChange={handleChange} />
      </label>

      <label className="field">
        <span className="field-label">Terrain</span>
        <input name="terrain" className="input" value={formData.terrain} onChange={handleChange} />
      </label>

      <label className="field">
        <span className="field-label">Modes</span>
        <input name="modes" className="input" value={formData.modes} onChange={handleChange} 
        />
      </label>

      <label className="field">
        <span className="field-label">Teams</span>
        <input
          name="teams"
          className="input"
          value={teamsValue}
          onChange={(e) => setFormData(prev => ({ ...prev, teams: e.target.value }))}
          placeholder="teams 1, teams 2, teams 3.."
        />
      </label>

      {error && <p style={{ color: "#ff8080" }}>{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Procesando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
