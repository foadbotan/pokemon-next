import { useCallback, useEffect, useRef, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Layout from "../components/Layout";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Error from "../components/Error";

const TYPE_URL = `https://pokeapi.co/api/v2/type`;
const IMAGES_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

export default function Home({ allPokemon, types, error }) {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [numberOfPokemon, setNumberOfPokemon] = useState(10);
  const infiniteScrollRef = useInfiniteScroll(displayMorePokemon);

  function displayMorePokemon() {
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
        .filter((p) => p.name.includes(search) || p.id.startsWith(search))
        .filter((p) => selectedTypes.every((t) => p.types.includes(t)));
    });
    // scroll to top when search or type changes
    window.scrollTo(0, 0);
  }, [search, allPokemon, selectedTypes]);

  if (error) return <Error error={error} />;

  return (
    <Layout>
      <div className="flex">
        <div className="fixed flex w-80 flex-col items-start gap-10 p-5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 text-xl"
            placeholder="Search Pokemon"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => {
                  if (selectedTypes.includes(type)) {
                    setSelectedTypes(selectedTypes.filter((t) => t !== type));
                  } else {
                    setSelectedTypes([...selectedTypes, type]);
                  }
                }}
                className={`${
                  selectedTypes.includes(type) ? "bg-green-400" : "bg-gray-200 hover:bg-gray-300"
                } w-1/4 rounded py-1 text-xs font-semibold uppercase`}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            onClick={reset}
            className="w-full rounded bg-red-400 py-2 text-sm font-semibold uppercase text-white hover:bg-red-500"
          >
            Clear
          </button>
          <p className="m-5 text-center text-sm">
            Showing {pokemon.length} of {allPokemon.length} Pokemon
          </p>
        </div>

        <div className="ml-80 flex flex-wrap gap-10">
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
        types: typesData.results
          .map((type) => type.name)
          .filter((type) => type !== "unknown" && type !== "shadow"),
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
