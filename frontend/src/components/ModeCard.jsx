export default function ModeCard({ mode }) {
  return (
    <div className="card">
      <h3>{mode.name}</h3>
      <p>{mode.description}</p>
      <p>Rules: {mode.rules}</p>
    </div>
  );
}
