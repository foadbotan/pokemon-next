import Pokemon from "./Pokemon";

export default function PokemonList({ pokemonList }) {
  return (
    <div>
      {pokemonList.map((pokemon) => (
        <Pokemon key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
