import { useState, useEffect } from "react";
import Head from "next/head";
import PokemonList from "../components/PokemonList";

const TOTAL_NUMBER_OF_POKEMON = 1154;
const POKEMON_PER_PAGE = 20;
const TOTAL_NUMBER_OF_PAGES = Math.floor(TOTAL_NUMBER_OF_POKEMON / POKEMON_PER_PAGE);
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

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
        <div className="space-x-3 flex justify-center items-center">
          <button
            className="py-2 px-3 rounded bg-green-600 disabled:bg-gray-200"
            onClick={handlePreviousPage}
            disabled={previousPage === null}
          >
            &lt;
          </button>
          <p>
            Page {page + 1} of {TOTAL_NUMBER_OF_PAGES + 1}
          </p>
          <button
            className="py-2 px-3 rounded bg-green-600 disabled:bg-gray-200"
            onClick={handleNextPage}
            disabled={nextPage === null}
          >
            &gt;
          </button>
        </div>
        <PokemonList pokemonList={pokemonList} />
      </main>
    </div>
  );
}
