import { useCallback, useEffect, useRef, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Layout from "../components/Layout";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Error from "../components/Error";
import Select from "react-select";
import { capitalize } from "../utils";

const TYPE_URL = `https://pokeapi.co/api/v2/type`;
const IMAGES_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

export default function Home({ allPokemon, types, error }) {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [numberOfPokemon, setNumberOfPokemon] = useState(10);
  const infiniteScrollRef = useInfiniteScroll(displayMorePokemon);

  function displayMorePokemon() {
    if (numberOfPokemon > pokemon.length) return;
    setNumberOfPokemon((prev) => prev + 5);
  }

  function reset() {
    setSearch("");
    setSelectedTypes([]);
    setNumberOfPokemon(0);
  }

  useEffect(() => {
    setNumberOfPokemon(10);
    setPokemon(() => {
      return allPokemon
        .filter(({ name, id }) => name.includes(search.toLowerCase()) || id.startsWith(search))
        .filter(({ types }) => selectedTypes.every((type) => types.includes(type.value)));
    });
    // scroll to top when search or type changes
    window.scrollTo(0, 0);
  }, [search, allPokemon, selectedTypes]);

  if (error) return <Error error={error} />;

  return (
    <Layout>
      <div className="container mx-auto flex flex-col">
        <div className="mb-5 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[250px] rounded-md border border-zinc-300 p-1.5"
            placeholder="Search by name or id"
          />
          <Select
            options={types}
            isMulti
            value={selectedTypes}
            onChange={(selected) => setSelectedTypes(selected)}
            className="min-w-[250px]"
            placeholder="Select type"
            instanceId="type-select" // fixes warning about duplicate ids
          />

          <p className="text-center text-sm">
            Showing {pokemon.length} of {allPokemon.length} Pokemon
          </p>
        </div>

        <div>
          {pokemon.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-2xl font-bold">No Pokemon found</h1>
              <button
                onClick={reset}
                className="rounded bg-red-400 py-1 px-5 text-white hover:bg-red-500"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full flex-wrap justify-center gap-10">
          {pokemon.slice(0, numberOfPokemon).map((pokemon) => (
            <PokemonCard key={pokemon.name} {...pokemon} />
          ))}
          <div ref={infiniteScrollRef}></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    // HACK: Instead of fetching all the pokemon (1154) one by one to get the types,
    // we can fetch the types (20) and get the pokemon from the types.
    // I'm not sure if this is faster, but it makes me happy :)
    const typesData = await fetch(TYPE_URL).then((res) => res.json());
    const types = await Promise.all(
      typesData.results.map(async (type) => {
        const { pokemon } = await fetch(type.url).then((res) => res.json());
        return pokemon.map(({ pokemon }) => ({ ...pokemon, type: type.name }));
      })
    );

    const allPokemon = {};
    types.flat().forEach((pokemon) => {
      if (allPokemon[pokemon.name]) {
        allPokemon[pokemon.name].types.push(pokemon.type);
      } else {
        const id = pokemon.url.split("/")[6];
        allPokemon[pokemon.name] = {
          name: pokemon.name,
          url: pokemon.url,
          types: [pokemon.type],
          id,
          image: `${IMAGES_URL}${id}.png`,
        };
      }
    });

    return {
      props: {
        allPokemon: Object.values(allPokemon).sort((a, b) => a.id - b.id),
        types: typesData.results.map(({ name }) => ({ value: name, label: capitalize(name) })),
      },
    };
  } catch (error) {
    return {
      props: {
        allPokemon: [],
        error: `Error fetching data: ${error} `,
      },
    };
  }
}
