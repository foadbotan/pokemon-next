import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import PokemonList from "../components/PokemonList";

const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`;

export async function getStaticProps() {
  const res = await fetch(URL);
  const data = await res.json();
  return {
    props: data,
  };
}

export default function Home({ next, results }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState(results);
  const [nextPage, setNextPage] = useState(next);

  const ref = useRef(null);

  useEffect(() => {
    function handleNextPage() {
      if (nextPage) fetchPokemon(nextPage);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, nextPage]);

  function fetchPokemon(url) {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(({ next, previous, results }) => {
        setPokemonList((prevPokemonList) => [...prevPokemonList, ...results]);
        setNextPage(next);
        setIsLoading(false);
      });
  }

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
            Loading More...
          </div>
        )}
      </main>
    </div>
  );
}
