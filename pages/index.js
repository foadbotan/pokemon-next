import PokemonCard from "../components/PokemonCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Error from "../components/Error";
import Select from "react-select";
import { capitalize } from "../utils";
import Head from "next/head";
import NavbarHome from "../components/Navbar/NavbarHome";

const TYPE_URL = `https://pokeapi.co/api/v2/type`;
const IMAGES_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

export default function Home(props) {
  const {
    allPokemon,
    allTypes,
    error,

    searchFilter,
    typeFilter,
    numberOfPokemonVisible,

    setSearchFilter,
    setTypeFilter,
    setNumberOfPokemonVisible,
  } = props;
  const infiniteScrollRef = useInfiniteScroll(displayMorePokemon);
  const filteredPokemon = allPokemon
    .filter(({ name, id }) => name.includes(searchFilter) || id.startsWith(searchFilter))
    .filter((pokemon) => typeFilter.every((type) => pokemon.types.includes(type.value)))
    .slice(0, numberOfPokemonVisible);

  function displayMorePokemon() {
    if (numberOfPokemonVisible > filteredPokemon.length) return;
    setNumberOfPokemonVisible((prev) => prev + 5);
  }

  function resetFilters() {
    setSearchFilter("");
    setTypeFilter([]);
    setNumberOfPokemonVisible(0);
  }

  if (error) return <Error error={error} />;

  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Pokedex</title>
      </Head>
      <div className="container mx-auto flex flex-col">
        <NavbarHome />
        <div className="mb-5 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-[250px] rounded-md border border-zinc-300 p-1.5"
            placeholder="Search by name or id"
          />
          <Select
            options={allTypes}
            isMulti
            value={typeFilter}
            onChange={(selected) => setTypeFilter(selected)}
            className="min-w-[250px]"
            placeholder="Select type"
            instanceId="type-select" // fixes warning about duplicate ids
          />

          <p className="text-center text-sm">
            Showing {filteredPokemon.length} of {allPokemon.length} Pokemon
          </p>
        </div>

        <div>
          {filteredPokemon.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-2xl font-bold">No Pokemon found</h1>
              <button
                onClick={resetFilters}
                className="rounded bg-red-400 py-1 px-5 text-white hover:bg-red-500"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full flex-wrap justify-center gap-5">
          {filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} {...pokemon} />
          ))}
        </div>
        <div ref={infiniteScrollRef}></div>
      </div>
    </div>
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
        allTypes: typesData.results.map(({ name }) => ({ value: name, label: capitalize(name) })),
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
