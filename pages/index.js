import Head from "next/head";
import PokemonList from "../components/PokemonList";
import useInfiniteScrollPokemon from "../hooks/useInfiniteScrollPokemon";

const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

export async function getStaticProps() {
  const res = await fetch(URL);
  const data = await res.json();
  return {
    props: data,
  };
}

export default function Home({ next, results }) {
  const { isLoading, pokemonList, ref, nextPage } = useInfiniteScrollPokemon(next, results);

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className="flex flex-col items-center gap-10 p-5">
        <h1 className=" text-5xl">Pokedex</h1>
        <PokemonList pokemonList={pokemonList} />

        {isLoading === false && (
          <div ref={ref} className="bg-gray-200 p-4">
            {nextPage ? "Loading More..." : "No More Pokemon"}
          </div>
        )}
      </main>
    </div>
  );
}
