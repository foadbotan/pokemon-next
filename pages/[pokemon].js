import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Error404 from "/components/errors/Error404";
import { COLORS } from "/constants/colors";
import { capitalize } from "/utils";
import NavbarPokemonPage from "/components/Navbar/NavbarPokemonPage";

const URL = "https://pokeapi.co/api/v2/pokemon/";

export default function Pokemon(props) {
  const { color, name, abilities, types, image, moves, id, stats, japaneseName, error } = props;
  const backgroundColor = color === "white" ? COLORS[types[0]] : COLORS[color];

  const router = useRouter();
  const query = router.query;
  if (error) return <Error404 error={error} query={query} />;

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Head>
        <title>{name}</title>
      </Head>
      <NavbarPokemonPage name={name} id={id} />
      <div className="container relative mx-auto">
        <p className="absolute w-full text-center text-[min(20vw,8rem)] font-black leading-none opacity-70">
          {japaneseName}
        </p>
        <div className="flex justify-center px-[15vw] drop-shadow-lg">
          {image && <Image src={image} alt={name} width="400" height="400" />}
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
      </div>
    </div>
  );
}

export async function getServerSideProps({ params: { pokemon } }) {
  try {
    const pokemonData = await fetch(URL + pokemon).then((res) => res.json());
    const speciesData = await fetch(pokemonData.species.url).then((res) => res.json());

    return {
      props: {
        japaneseName: speciesData.names.find((name) => name.language.name === "ja").name,
        color: speciesData.color.name,
        name: capitalize(pokemonData.name),
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
