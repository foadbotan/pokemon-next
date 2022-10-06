import { useEffect, useState } from "react";
import Pokemon from "./Pokemon";

const URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, []);

  return (
    <div>
      {pokemonList.map((pokemon) => (
        <Pokemon key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
