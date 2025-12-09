export default function CharacterCard({ character }) {
  return (
    <div className="card">
      <h3>{character.name}</h3>
      <p>{character.description}</p>
      <p>Gender: {character.gender}</p>
      <p>Rank: {character.rank?.join(", ")}</p>
      {character.image && <img src={character.image} width="150" />}
      <p>Weapons: {character.weapons?.join(", ")}</p>
    </div>
  );
}
