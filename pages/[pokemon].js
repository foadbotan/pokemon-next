import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Error404 from "/components/errors/Error404";
import { COLORS } from "/constants/colors";
import { capitalize } from "/utils";
import NavbarPokemonPage from "/components/Navbar/NavbarPokemonPage";
import StatsBar from "../components/StatsBar";

import { BASE_URL } from "/pages/index";

export default function Pokemon(props) {
  const {
    color,
    name,
    abilities,
    types,
    image,
    moves,
    id,
    stats,
    japaneseName,
    error,
    descriptions,
    weight,
    height,
  } = props;
  const backgroundColor = color === "white" ? COLORS[types[0]] : COLORS[color];

  const router = useRouter();
  const query = router.query;
  if (error) return <Error404 error={error} query={query} />;

  return (
    <div className="flex min-h-screen flex-col gap-4 pb-10 text-white" style={{ backgroundColor }}>
      <Head>
        <title>{name}</title>
      </Head>

      <NavbarPokemonPage name={name} id={id} />

      <section className="container relative mx-auto">
        <p className="absolute left-0 w-full text-center text-[min(15vw,8rem)] font-black leading-none text-black opacity-70">
          {japaneseName}
        </p>
        <div className="flex justify-center px-[15vw] drop-shadow-lg">
          {image && <Image src={image} alt={name} width="400" height="400" />}
        </div>
      </section>

      <section className="container mx-auto flex flex-wrap justify-center gap-8 sm:flex-row-reverse">
        <div className="flex max-w-[400px] flex-col justify-between gap-4 ">
          <div className="">
            <p>
              <span className="mr-2 text-lg font-bold">Weight:</span>
              <span className="font-light">{weight}kg</span>
            </p>
            <p>
              <span className="mr-2 text-lg font-bold">Height:</span>
              <span className="font-light">{height}cm</span>
            </p>
          </div>
          <div className="">
            <h3 className="text-lg font-bold">Description</h3>
            <p className="font-light">{capitalize(descriptions[23])}</p>
          </div>
        </div>

        <div className="flex w-full max-w-[400px] flex-col ">
          {stats.map((stat) => (
            <StatsBar key={stat.name} stat={stat} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params: { pokemon } }) {
  try {
    const pokemonData = await fetch(`${BASE_URL}/pokemon/${pokemon}`).then((res) => res.json());
    const speciesData = await fetch(pokemonData.species.url).then((res) => res.json());
    const evolutionData = await fetch(speciesData.evolution_chain.url).then((res) => res.json());

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
        descriptions: speciesData.flavor_text_entries
          .filter((flavorText) => flavorText.language.name === "en")
          .map(({ flavor_text }) => flavor_text),
        weight: pokemonData.weight / 10, // convert from hectogram to kg
        height: pokemonData.height * 10, // convert from decimeter to cm
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
