import { useEffect, useRef, useState } from "react";

import Head from "next/head";
import Pokemon from "../components/Pokemon";

const URL = `https://pokeapi.co/api/v2/pokemon?limit=-1`;

export async function getStaticProps() {
  const res = await fetch(URL);
  const data = await res.json();
  return {
    props: {
      allPokemon: data.results,
    },
  };
}

export default function Home({ allPokemon }) {
  const [search, setSearch] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const loadMoreRef = useRef();

  useEffect(() => {
    const includesSearchString = (pokemon) => new RegExp(search, "i").test(pokemon.name);
    setFilteredPokemon(allPokemon.filter(includesSearchString));
    setPokemonList([]);
  }, [search, allPokemon]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPokemonList((prev) => [
          ...prev,
          ...filteredPokemon.slice(prev.length, prev.length + 10),
        ]);
      }
    });

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [filteredPokemon]);

  return (
    <div>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main className="flex flex-col items-center gap-10 p-5">
        <h1 className=" text-5xl">Pokemon</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 text-xl"
          placeholder="Search "
        />
        <div className="flex flex-wrap justify-center gap-10">
          {pokemonList.map((pokemon, index) => (
            <Pokemon key={pokemon.name} {...pokemon} />
          ))}
        </div>

        <div ref={loadMoreRef}></div>
      </main>
    </div>
  );
}
