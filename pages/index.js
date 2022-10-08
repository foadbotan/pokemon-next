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
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }, []);

  function handlePreviousPage() {
    if (page === 0) return;
    setPage((prevPage) => prevPage - 1);
  }

  function handleNextPage() {
    if (nextPage === null) return;
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main>
        <h1 className="m-5 text-center text-5xl">Pokedex</h1>
        <PokemonList pokemonList={pokemonList} />
      </main>
    </div>
  );
}
