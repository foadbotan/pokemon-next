import { useEffect, useRef, useState } from "react";

import Head from "next/head";
import Pokemon from "../components/Pokemon";

const URL = `https://pokeapi.co/api/v2/pokemon?limit=1154`;

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
  const [filter, setFilter] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState(
    allPokemon.filter((pokemon) => new RegExp(filter, "i").test(pokemon.name))
  );
  const [pokemonList, setPokemonList] = useState(filteredPokemon.slice(0, 5));
  const ref = useRef(null);

  useEffect(() => {
    setFilteredPokemon(allPokemon.filter((pokemon) => new RegExp(filter, "i").test(pokemon.name)));
    setPokemonList([]);
  }, [filter, allPokemon]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMorePokemon();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    function loadMorePokemon() {
      setPokemonList((prevList) => [
        ...prevList,
        ...filteredPokemon.slice(prevList.length, prevList.length + 5),
      ]);
    }

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [filteredPokemon, pokemonList]);

  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main className="flex flex-col items-center gap-10 p-5">
        <h1 className=" text-5xl">Pokedex</h1>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 text-xl"
          placeholder="Search Pokemon"
        />
        <div className="flex flex-wrap justify-center gap-10">
          {pokemonList.map((pokemon, index) => {
            return <Pokemon key={pokemon.name} {...pokemon} />;
          })}
        </div>

        <div ref={ref}></div>
      </main>
    </div>
  );
}
