import React from "react";

export default function CharacterForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [formData, setFormData] = React.useState(() => initialData ?? {
    name: "",
    description: "",
    rank: [],
    gender: "",
    weapons: [],
    equipment: [],
    image: ""
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
      rank: csvToArray(formData.rank),
      weapons: csvToArray(formData.weapons),
      equipment: csvToArray(formData.equipment)
    };

    try {
      await onSubmit(payload);
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
        <span className="field-label">Gender</span>
        <select name="gender" className="input" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>

      <label className="field">
        <span className="field-label">Rank</span>
        <input
          name="rank"
          className="input"
          value={Array.isArray(formData.rank) ? formData.rank.join(", ") : formData.rank}
          onChange={(e) => setFormData(prev => ({ ...prev, rank: e.target.value }))}
        />
      </label>

      <label className="field">
        <span className="field-label">Weapons</span>
        <input
          name="weapons"
          className="input"
          value={Array.isArray(formData.weapons) ? formData.weapons.join(", ") : formData.weapons}
          onChange={(e) => setFormData(prev => ({ ...prev, weapons: e.target.value }))}
          placeholder="weapon 1, weapon 2, weapon 3.."
        />
      </label>

      <label className="field">
        <span className="field-label">Equipment</span>
        <input
          name="equipment"
          className="input"
          value={Array.isArray(formData.equipment) ? formData.equipment.join(", ") : formData.equipment}
          onChange={(e) => setFormData(prev => ({ ...prev, equipment: e.target.value }))}
          placeholder="equipment 1, equipment 2, equipment 3.."
        />
      </label>

      <label className="field">
        <span className="field-label">Image (URL)</span>
        <input name="image" className="input" value={formData.image} onChange={handleChange} />
      </label>

      {formData.image && <img src={formData.image} className="img-preview" alt="preview" />}

      {error && <p style={{ color: "#ff8080" }}>{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Procesando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
