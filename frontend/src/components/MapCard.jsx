export default function MapCard({ map }) {
  return (
    <div className="card">
      <h3>{map.name}</h3>
      <p>Location: {map.location}</p>
      <p>Terrain: {map.terrain}</p>
      <p>Modes: {map.modes}</p>
      <p>Teams: {map.teams?.join(", ")}</p>
    </div>
  );
}
