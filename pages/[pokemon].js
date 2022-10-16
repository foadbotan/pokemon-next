import Link from "next/link";

const URL = "https://pokeapi.co/api/v2/pokemon/";

export default function Pokemon({ pokemonData }) {
  return (
    <div>
      <Link href="/">⬅ Back to Pokemon</Link>
      <h1 className="m-5 text-center text-5xl capitalize">{pokemonData.name}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(URL);
  const { results } = await res.json();

  const paths = results.map(({ name }) => ({ params: { pokemon: name } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${URL}${params.pokemon}`);
  const pokemonData = await res.json();

  return { props: { pokemonData } };
}
