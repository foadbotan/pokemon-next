import { useState, useEffect } from "react";
import Head from "next/head";
import PokemonList from "../components/PokemonList";

const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=6`;

export async function getStaticProps() {
  const res = await fetch(URL);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data: { next, previous, results } }) {
  const [pokemonList, setPokemonList] = useState(results);
  const [nextPage, setNextPage] = useState(next);

  console.log(pokemonList);

  function handleNextPage() {
    if (nextPage === null) return;
    fetchPokemon(nextPage);
  }

  function fetchPokemon(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList((prevPokemonList) => [...prevPokemonList, ...data.results]);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className="flex flex-col items-center gap-5">
        <h1 className="m-5 text-5xl">Pokedex</h1>
        <PokemonList pokemonList={pokemonList} />

        <button onClick={handleNextPage} className="m-3 bg-gray-200 p-4">
          More
        </button>
      </main>
    </div>
  );
}
