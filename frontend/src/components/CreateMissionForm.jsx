import React from "react";

export default function MissionForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [formData, setFormData] = React.useState(() => initialData ?? {
    name: "",
    plot: "",
    team: "",
    enemies: [],
    place: "",
    objective: "",
    date: ""
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
      enemies: csvToArray(formData.enemies),
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

  const enemiesValue = Array.isArray(formData.enemies) ? formData.enemies.join(", ") : formData.enemies;
  const dateValue = formData.date ? String(formData.date).slice(0,10) : "";

  return (
    <form onSubmit={submit} className="form-card" >
      <div className="field">
        <label className="field-label">Name</label>
        <input name="name" className="input" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="field">
        <label className="field-label">Plot</label>
        <textarea name="plot" className="textarea" rows={3} value={formData.plot} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="field-label">Team</label>
        <input name="team" className="input" value={formData.team} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="field-label">Place</label>
        <input name="place" className="input" value={formData.place} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="field-label">Objective</label>
        <input name="objective" className="input" value={formData.objective} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="field-label">Date</label>
        <input type="date" name="date" className="input" value={dateValue} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="field-label">Enemies</label>
        <input
          name="enemies"
          className="input"
          value={enemiesValue}
          onChange={(e) => setFormData(prev => ({ ...prev, enemies: e.target.value }))}
          placeholder="enemies 1, enemies 2, enemies 3..."
        />
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
