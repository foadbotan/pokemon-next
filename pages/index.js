import PokemonCard from "../components/PokemonCard";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Error from "../components/errors/Error";
import { capitalize } from "../utils";
import Head from "next/head";
import Image from "next/image";
import FilterControls from "../components/FilterControls.js";
import ErrorSearchEmpty from "../components/errors/ErrorSearchEmpty";

export const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_URL = `${BASE_URL}/pokemon/?limit=-1`;
const TYPES_URL = `${BASE_URL}/type`;

export default function Home(props) {
  const infiniteScrollRef = useInfiniteScroll(displayMorePokemon);
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

  if (error) return <Error error={error} />;

  const filteredPokemon = allPokemon
    .filter(
      ({ name, id }) => name.includes(searchFilter.toLowerCase()) || id.endsWith(searchFilter)
    )
    .filter((pokemon) => typeFilter.every((type) => pokemon.types.includes(type.value)));

  function displayMorePokemon() {
    if (numberOfPokemonVisible > filteredPokemon.length) return;
    setNumberOfPokemonVisible((prev) => prev + 10);
  }

  function clearFilters() {
    setSearchFilter("");
    setTypeFilter([]);
    setNumberOfPokemonVisible(0);
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <Head>
        <title>Pokedex</title>
        <meta
          name="description"
          content="A Pokedex app created with React, Next.js, and Tailwind"
        />
        <link rel="icon" href="/pokeball.svg" />
      </Head>
      <header className="mx-auto w-48 py-5 sm:w-80 sm:py-10">
        <Image src="/pokemon-logo.svg" width="300" height="50" alt="Pokemon logo" />
      </header>
      <main className="container mx-auto flex flex-col gap-4">
        <FilterControls
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          allTypes={allTypes}
          clearFilters={clearFilters}
        />

        <section className="flex w-full flex-wrap justify-center gap-2 lg:gap-4">
          {filteredPokemon.slice(0, numberOfPokemonVisible).map((pokemon) => (
            <PokemonCard key={pokemon.name} {...pokemon} />
          ))}
        </section>

        {filteredPokemon.length === 0 && <ErrorSearchEmpty clearFilters={clearFilters} />}

        <div ref={infiniteScrollRef}></div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const { results: typesData } = await fetch(TYPES_URL).then((res) => res.json());
    const { results: pokemonData } = await fetch(POKEMON_URL).then((res) => res.json());

    const allTypes = await Promise.all(
      typesData.map(async (type) => {
        const { pokemon } = await fetch(type.url).then((res) => res.json());
        return {
          type: type.name,
          pokemonList: pokemon.map(({ pokemon }) => pokemon.name),
        };
      })
    );

    const allPokemon = pokemonData.map((pokemon) => {
      return {
        name: pokemon.name,
        id: pokemon.url.split("/")[6],
        types: allTypes.reduce((types, { type, pokemonList }) => {
          return pokemonList.includes(pokemon.name) ? [...types, type] : types;
        }, []),
      };
    });

    return {
      props: {
        allPokemon,
        allTypes: allTypes
          .filter(({ type }) => type !== "unknown" && type !== "shadow") // remove unused pokemon types "shadow" and "unknown"
          .map(({ type }) => ({ value: type, label: capitalize(type) })), // format type options for react-select
      },
    };
  } catch (error) {
    return {
      props: {
        error: `Error fetching data: ${error} `,
      },
    };
  }
}
