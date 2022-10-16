import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
  const infiniteScrollRef = useRef();

  useEffect(() => {
    setFilteredPokemon(allPokemon.filter((pokemon) => pokemon.name.includes(search)));
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

    if (infiniteScrollRef.current) observer.observe(infiniteScrollRef.current);

    return () => observer.disconnect();
  }, [filteredPokemon]);

  return (
    <div>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main className="flex flex-col items-center gap-10 p-5">
        {/* <h1 className=" text-5xl">Pokemon</h1> */}
        <Image src="/pokemon-logo.svg" width="300" height="100" alt="logo" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 text-xl"
          placeholder="Search "
        />
        <div className="flex flex-wrap justify-center gap-10">
          {pokemonList.map((pokemon) => (
            <Pokemon key={pokemon.name} {...pokemon} />
          ))}
        </div>

        <div ref={infiniteScrollRef}></div>
      </main>
    </div>
  );
}
