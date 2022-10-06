import Head from "next/head";
import PokemonList from "../components/PokemonList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Pokedex</title>
      </Head>

      <main>
        <h1 className="text-5xl text-center m-5">Pokedex</h1>
        <PokemonList />
      </main>
    </div>
  );
}
