import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Error404 from "/components/errors/Error404";
import { COLORS } from "/constants/colors";
import { capitalize } from "/utils";
import NavbarPokemonPage from "/components/Navbar/NavbarPokemonPage";
import StatsBar from "../components/StatsBar";
import Link from "next/link";
import PokemonCard from "../components/PokemonCard";
import TypeButton from "../components/TypeButton";

import { BASE_URL } from "/pages/index";
import { IMAGES_URL } from "../components/PokemonCard";
import { BsChevronLeft as LeftArrow } from "react-icons/bs";
import { BsChevronRight as RightArrow } from "react-icons/bs";

export default function Pokemon(props) {
  const {
    color,
    name,
    abilities,
    types,
    image,
    id,
    stats,
    japaneseName,
    error,
    descriptions,
    weight,
    height,
    evolutionChain,
    varieties,
    setTypeFilter,
    setSearchFilter,
  } = props;

  const isDark = color === "white";

  const router = useRouter();
  const query = router.query;
  if (error) return <Error404 error={error} query={query} />;
  const nextPokemon = parseInt(id) + 1;
  const previousPokemon = parseInt(id) - 1;

  return (
    <div
      className={`flex min-h-screen flex-col gap-4 pb-10 ${isDark ? "text-black" : "text-white"}`}
      style={{ backgroundColor: COLORS[color] }}
    >
      <Head>
        <title>{name}</title>
      </Head>

      <NavbarPokemonPage name={name} id={id} isDark={isDark} />

      <section className="container relative my-4 mx-auto">
        <p className="absolute left-0 w-full text-center text-[min(15vw,8rem)] font-black leading-none text-black opacity-70">
          {japaneseName}
        </p>
        <div className="flex justify-center px-[15vw] drop-shadow-lg">
          {image && <Image src={image} alt={name} width="400" height="400" />}
        </div>
        {previousPokemon > 0 && (
          <Link href={`/${previousPokemon}`}>
            <a>
              <LeftArrow size={30} className="absolute top-[50%] left-2 cursor-pointer" />
            </a>
          </Link>
        )}
        {nextPokemon < 1554 && (
          <Link href={`/${nextPokemon}`}>
            <a>
              <RightArrow size={30} className="absolute top-[50%] right-2 cursor-pointer" />
            </a>
          </Link>
        )}
      </section>

      <section className="flex justify-evenly">
        {types.map((type) => (
          <Link key={type} href="/">
            <a>
              <TypeButton
                type={type}
                label={type}
                className="px-3 py-1.5 text-xs"
                onClick={() => {
                  setSearchFilter("");
                  setTypeFilter([{ value: type, label: capitalize(type) }]);
                }}
              />
            </a>
          </Link>
        ))}
      </section>

      <section className="container my-4 mx-auto">
        <h2 className="my-2 text-xl font-bold sm:m-10">Evolution Chain</h2>
        <div className="flex justify-evenly">
          {evolutionChain.map((pokemon) => (
            <Link key={pokemon.name} href={`/${pokemon.name}`}>
              <div className="flex cursor-pointer flex-col gap-2">
                <Image
                  src={`${IMAGES_URL}${pokemon.id}.png`}
                  alt={pokemon.name}
                  width="150"
                  height="150"
                  className="opacity-20 brightness-0 transition hover:opacity-100 hover:brightness-100"
                />

                <p className="text-center capitalize">{pokemon.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container my-4 mx-auto">
        <h2 className="my-2 text-xl font-bold sm:m-10">Stats</h2>

        <div className="flex flex-wrap justify-center gap-8 sm:flex-row-reverse">
          <div className="flex max-w-[400px] flex-col justify-between gap-4">
            <div>
              <h3 className="py-1 font-bold">Description</h3>
              <p className="font-light">{capitalize(descriptions[0])}</p>
            </div>

            <div className="flex flex-col justify-between">
              <p>
                <span className="mr-2 font-bold">Weight:</span>
                <span className="font-light">{weight}kg</span>
              </p>
              <p>
                <span className="mr-2 font-bold">Height:</span>
                <span className="font-light">{height}cm</span>
              </p>
              <p>
                <span className="mr-2 font-bold">Abilities:</span>
                <span className="font-light">
                  {abilities.map((ability) => capitalize(ability)).join(", ")}
                </span>
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-[400px] flex-col ">
            {stats.map((stat) => (
              <StatsBar key={stat.name} stat={stat} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {varieties.length > 0 && (
        <section className="container my-4 mx-auto">
          <h2 className="my-2 text-xl font-bold sm:m-10">Variants</h2>

          <div className="flex w-full flex-wrap justify-center gap-2 lg:gap-4">
            {varieties.map((variety) => (
              <PokemonCard key={variety.name} {...variety} />
            ))}
          </div>
        </section>
      )}
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
    const evolutionChain = getEvolutionChain(evolutionData);

    // remove Pokemon in the evolution chain and are the current Pokemon
    const varieties = speciesData.varieties
      .map(({ pokemon }) => pokemon)
      .filter(
        ({ name }) =>
          evolutionChain.every((pokemon) => pokemon.name !== name && name) && name !== pokemon
      );

    const varietiesData = await Promise.all(
      varieties.map(({ url }) => fetch(url).then((res) => res.json()))
    );

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
        weight: pokemonData.weight / 10, // convert from hectogram to kg
        height: pokemonData.height * 10, // convert from decimeter to cm
        evolutionChain,
        stats: pokemonData.stats.map(({ base_stat, stat }) => ({
          base_stat,
          name: stat.name,
        })),
        descriptions: speciesData.flavor_text_entries
          .filter((flavorText) => flavorText.language.name === "en")
          .map(({ flavor_text }) => flavor_text),
        varieties: varietiesData.map(({ id, name, types }) => ({
          name: name,
          id,
          types: types.map(({ type }) => type.name),
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

function getEvolutionChain(evolution) {
  const species = {
    name: evolution.species.name,
    id: evolution.species.url.split("/")[6],
  };

  if (evolution.evolves_to.length === 0) return [species];
  return [species, ...getEvolutionChain(evolution.evolves_to[0])];
}
