import Pokemon from "./Pokemon";

export default function PokemonList({ pokemonList }) {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {pokemonList.map((pokemon) => (
        <Pokemon key={pokemon.name} {...pokemon} />
      ))}
    </div>
  );
}
