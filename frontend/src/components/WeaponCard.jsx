export default function WeaponCard({ weapon }) {
  return (
    <div className="card">
      <h3>{weapon.name}</h3>
      <p>{weapon.description}</p>
      {weapon.image && <img src={weapon.image} width="150" />}
      <ul>
        <li>Class: {weapon.features.weaponClass}</li>
        <li>Damage: {weapon.features.damage}</li>
        <li>Caliber: {weapon.features.caliber}</li>
      </ul>
    </div>
  );
}