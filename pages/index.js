import { useState, useEffect } from "react";
import Head from "next/head";
import PokemonList from "../components/PokemonList";
import Pagination from "../components/Pagination";

import { BASE_URL, POKEMON_PER_PAGE } from "../constants";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");

  useEffect(() => {
    const URL = `${BASE_URL}?offset=${page * POKEMON_PER_PAGE}&limit=${POKEMON_PER_PAGE}`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      });
  }, [page]);

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
        <h1 className="text-5xl text-center m-5">Pokedex</h1>
        <Pagination {...{ handleNextPage, handlePreviousPage, nextPage, previousPage, page }} />
        <PokemonList pokemonList={pokemonList} />
      </main>
    </div>
  );
}
