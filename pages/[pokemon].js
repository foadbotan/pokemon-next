import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Error404 from "/components/errors/Error404";
import { COLORS } from "/constants/colors";
import { capitalize } from "/utils";
import NavbarPokemonPage from "/components/Navbar/NavbarPokemonPage";
import StatsBar from "../components/StatsBar";
import Link from "next/link";

import { BASE_URL } from "/pages/index";
import { IMAGES_URL } from "../components/PokemonCard";

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
    evolutionChain,
  } = props;
  const backgroundColor = color === "white" ? COLORS[types[0]] : COLORS[color];

  console.log(evolutionChain);

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
          {image && <Image src={image} alt={name} width="500" height="500" />}
        </div>
      </section>

      <section className="container mx-auto">
        <div className="flex flex-col gap-4">
          <h2 className="m-2 text-center text-xl font-bold">Evolution Chain</h2>
          <div className="flex justify-evenly">
            {evolutionChain.map((pokemon) => (
              <Link key={pokemon.name} href={`/${pokemon.name}`}>
                <div className="flex flex-col gap-2">
                  <Image
                    src={`${IMAGES_URL}${pokemon.id}.png`}
                    alt={pokemon.name}
                    width="150"
                    height="150"
                    className="opacity-30 brightness-0 hover:opacity-100 hover:brightness-100"
                  />
                  <p className="text-center capitalize">{pokemon.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto ">
        <h2 className="m-2 text-center text-xl font-bold">Stats</h2>

        <div className="flex flex-wrap justify-center gap-8 sm:flex-row-reverse">
          <div className="flex max-w-[400px] flex-col justify-between gap-4 ">
            <div className="flex justify-between">
              <div className="flex flex-col justify-between">
                <p>
                  <span className="mr-2 font-bold">Weight:</span>
                  <span className="font-light">{weight}kg</span>
                </p>
                <p>
                  <span className="mr-2 font-bold">Height:</span>
                  <span className="font-light">{height}cm</span>
                </p>
              </div>

              <div className="flex flex-col justify-center gap-2">
                {types.map((type) => (
                  <div
                    key={type}
                    className="flex items-center gap-1 rounded-full border border-white py-1 px-3 text-center text-xs font-medium uppercase text-white"
                    style={{ backgroundColor: COLORS[type] }}
                  >
                    <Image src={`/icons/${type}.svg`} alt={type} width="16" height="16" />
                    {capitalize(type)}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="py-1 font-bold">Description</h3>
              <p className="font-light">{capitalize(descriptions[23])}</p>
            </div>
          </div>
          <div className="flex w-full max-w-[400px] flex-col ">
            {stats.map((stat) => (
              <StatsBar key={stat.name} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params: { pokemon } }) {
  try {
    const pokemonData = await fetch(`${BASE_URL}/pokemon/${pokemon}`).then((res) => res.json());
    const speciesData = await fetch(pokemonData.species.url).then((res) => res.json());
    const { chain: evolutionData } = await fetch(speciesData.evolution_chain.url).then((res) =>
      res.json()
    );

    function getEvolutionChain(evolution) {
      const species = {
        name: evolution.species.name,
        id: evolution.species.url.split("/")[6],
      };

      if (evolution.evolves_to.length === 0) return [species];
      return [species, ...getEvolutionChain(evolution.evolves_to[0])];
    }

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
        evolutionChain: getEvolutionChain(evolutionData),
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
