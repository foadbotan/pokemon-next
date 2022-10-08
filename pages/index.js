import { useState, useEffect } from "react";
import Head from "next/head";
import PokemonList from "../components/PokemonList";

const POKEMON_PER_PAGE = 20;
const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${POKEMON_PER_PAGE}`;

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  useEffect(() => {
    fetchPokemon(URL);
  }, []);

  function handlePreviousPage() {
    if (previousPage === null) return;
    fetchPokemon(previousPage);
  }

  function handleNextPage() {
    if (nextPage === null) return;
    fetchPokemon(nextPage);
  }

  function fetchPokemon(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main>
        <h1 className="m-5 text-center text-5xl">Pokedex</h1>
        <button onClick={handlePreviousPage} className="m-3 bg-gray-200 p-4">
          &#60;
        </button>
        <button onClick={handleNextPage} className="m-3 bg-gray-200 p-4">
          &#62;
        </button>
        <PokemonList pokemonList={pokemonList} />
      </main>
    </div>
  );
}
