export default function AchievementCard({ achievement }) {
  return (
    <div className="card">
      <h3>{achievement.name}</h3>
      <p>{achievement.description}</p>
      <p>Points: {achievement.points}</p>
    </div>
  );
}
