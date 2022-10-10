import { useState, useEffect, useRef } from "react";

export default function useInfiniteScrollPokemon(next, results) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState(results);
  const [nextPage, setNextPage] = useState(next);

  const ref = useRef(null);

  function fetchMorePokemon(url) {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then(({ next, results }) => {
        setPokemonList((prevPokemonList) => [...prevPokemonList, ...results]);
        setNextPage(next);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPage) {
          fetchMorePokemon(nextPage);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, nextPage]);

  return { isLoading, pokemonList, ref, nextPage };
}
