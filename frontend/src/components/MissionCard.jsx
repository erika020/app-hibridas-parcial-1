export default function MissionCard({ mission }) {
  return (
    <div className="card">
      <h3>{mission.name}</h3>
      <p>{mission.plot}</p>
      <p>Tea: {mission.team}</p>
      <p>Objective: {mission.objective}</p>
      <p>Enemies: {mission.enemies?.join(", ")}</p>
    </div>
  );
}
