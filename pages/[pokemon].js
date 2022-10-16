import Link from "next/link";
import Image from "next/image";
import PokemonCard from "../components/PokemonCard";

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon/";

export default function Pokemon({ pokemonData, evolutions, varietiesData, speciesData, error }) {
  if (error)
    return (
      <div>
        <Link href="/">
          <p className="m-5 cursor-pointer text-xl underline">← Return to Pokemon search</p>
        </Link>
        <p className="m-5 text-2xl text-red-600">{error}</p>
      </div>
    );
  if (!pokemonData) return <h1 className="m-20 text-center text-5xl">Loadding...</h1>;

  const name = pokemonData.name;
  const abilities = pokemonData.abilities.map(({ ability }) => ability.name);
  const types = pokemonData.types.map(({ type }) => type.name);
  const image = pokemonData.sprites.other["official-artwork"].front_default;
  const moves = pokemonData.moves.map(({ move }) => move.name);
  const stats = pokemonData.stats.map(({ base_stat, stat }) => ({
    name: stat.name,
    value: base_stat,
  }));
  const varieties = varietiesData.filter(
    (variety) => !evolutions.some((evolution) => evolution.name === variety.name)
  );
  const color = speciesData.color.name;

  return (
    <div className="">
      <Link href="/">⬅ Back to Pokemon</Link>
      <h1 className="m-5 text-center text-6xl capitalize">{name}</h1>
      <div>
        <div className="flex items-center">
          <Image src={image} alt={name} height="400" width="400" />
          <div className="flex gap-10">
            <div>
              <h2 className="text-4xl">Stats</h2>
              <ul>
                {stats.map(({ name, value }) => (
                  <li key={name}>
                    {name}: {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-4xl">Type</h2>
              <ul>
                {types.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-4xl">Abilities</h2>
              <ul>
                {abilities.map((ability) => (
                  <li key={ability}>{ability}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="m-5">
          <h2 className="m-10 text-center text-4xl">Evolutions</h2>
          <ul className="flex flex-wrap justify-center gap-10">
            {evolutions.map((evolution) => (
              <li key={evolution.name}>
                <PokemonCard
                  key={evolution.name}
                  url={POKEMON_URL + evolution.name}
                  name={evolution.name}
                />
              </li>
            ))}
          </ul>
        </div>

        {varieties.length > 0 && (
          <div className="m-5">
            <h2 className="m-10 text-center text-4xl">Varieties</h2>
            <ul className="flex flex-wrap justify-center gap-10">
              {varieties.map((pokemon) => {
                return (
                  <li key={pokemon.name}>
                    <PokemonCard key={pokemon.name} {...pokemon} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {moves.length > 0 && (
          <div className="m-5 capitalize">
            <h2 className="m-10 text-center text-4xl">Moves</h2>
            <ul className="flex flex-wrap">
              {moves.map((move) => (
                <li key={move}>
                  <p className="m-2 bg-white py-1 px-3 ">{move}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await fetch(POKEMON_URL).then((res) => res.json());

  const paths = data.results.map(({ name }) => ({ params: { pokemon: name } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params: { pokemon } }) {
  try {
    const pokemonData = await fetch(POKEMON_URL + pokemon).then((res) => res.json());
    const speciesData = await fetch(pokemonData.species.url).then((res) => res.json());
    const varietiesData = speciesData.varieties.map(({ pokemon }) => pokemon);
    const evolutionChainData = await fetch(speciesData.evolution_chain.url).then((res) =>
      res.json()
    );
    const evolutions = getEvolutions(evolutionChainData.chain);

    function getEvolutions(chain) {
      const evolutions = [];
      let current = chain;
      while (current) {
        evolutions.push(current.species);
        current = current.evolves_to[0];
      }
      return evolutions;
    }

    return {
      props: {
        pokemonData,
        varietiesData,
        evolutions,
        speciesData,
      },
    };
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      pokemonData: null,
      varietiesData: null,
      evolutions: null,
      speciesData: null,
      error: `Error: Pokemon "${pokemon}" not found`,
    },
  };
}
