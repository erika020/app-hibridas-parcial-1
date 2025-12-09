import React from "react";

export default function ModeForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [formData, setFormData] = React.useState(() => initialData ?? {
    name: "",
    description: "",
    rules: ""
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
    <form onSubmit={submit} className="form-card" style={{ display: "grid", gap: 12 }}>
      <label className="field">
        <span className="field-label">Name</span>
        <input name="name" className="input" value={formData.name} onChange={handleChange} required />
      </label>

      <label className="field">
        <span className="field-label">Description</span>
        <textarea name="description" className="textarea" rows={3} value={formData.description} onChange={handleChange} />
      </label>

      <label className="field">
        <span className="field-label">Rules</span>
        <textarea name="rules" className="textarea" rows={4} value={formData.rules} onChange={handleChange} />
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
