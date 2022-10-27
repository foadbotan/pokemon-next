import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";
import { COLORS } from "../constants/colors";

const URL = "https://pokeapi.co/api/v2/pokemon/";

export default function Pokemon(props) {
  const { color, name, abilities, types, image, moves, id, stats, japaneseName, error } = props;

  const router = useRouter();
  const query = router.query;
  if (error) {
    return (
      <Layout>
        <h1 className="mb-2 text-center text-4xl">Error 404</h1>
        <p className="text-center">Pokemon: {query.pokemon}</p>
        <p className="text-center text-red-500">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout
      title={name}
      style={{
        backgroundColor: COLORS[color],
        backgroundImage: `linear-gradient(45deg, transparent 0%, hsl(0 0% 100% / 0.3) 30%, hsl(0 0% 100% / 0.3) 70%, transparent 100%)`,
      }}
      className="h-screen"
    >
      <p className="absolute text-[12rem] font-black  opacity-10 ">{japaneseName}</p>
      <div className="flex">
        <h2 className="text-6xl font-bold capitalize">{name}</h2>
        <Image src={image} alt={name} height="300" width="300" />
      </div>
      <div className="flex flex-wrap gap-4">
        {types.map((type) => (
          <div
            key={type}
            className="rounded-full px-4 py-2 text-sm font-bold capitalize"
            style={{ backgroundColor: COLORS[type] }}
          >
            <div className="opacity-60">{type}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const data = await fetch(URL + "?limit=-1").then((res) => res.json());
//   const paths = data.results.map((pokemon) => ({
//     params: { pokemon: pokemon.name },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params: { pokemon } }) {
  try {
    const pokemonData = await fetch(URL + pokemon).then((res) => res.json());
    const speciesData = await fetch(pokemonData.species.url).then((res) => res.json());

    return {
      props: {
        japaneseName: speciesData.names.find((name) => name.language.name === "ja").name,
        color: speciesData.color.name,
        name: pokemonData.name,
        abilities: pokemonData.abilities.map(({ ability }) => ability.name),
        types: pokemonData.types.map(({ type }) => type.name),
        image: pokemonData.sprites.other["official-artwork"].front_default,
        moves: pokemonData.moves.map(({ move }) => move.name),
        id: pokemonData.id.toString(),
        stats: pokemonData.stats.map(({ base_stat, stat }) => ({
          base_stat,
          name: stat.name,
        })),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: "Pokemon not found",
      },
    };
  }
}
