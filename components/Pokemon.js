import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ url, name }) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [abilities, setAbilities] = useState("");
  const [types, setTypes] = useState("");
  const [species, setSpecies] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setImage(data.sprites.other["official-artwork"].front_default);
        setAbilities(data.abilities.map(({ ability }) => ability.name));
        setTypes(data.types.map(({ type }) => type.name));
        setSpecies(data.species.url);
        setId(data.id);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [url]);

  useEffect(() => {
    if (species === "") return;
    fetch(species)
      .then((res) => res.json())
      .then((data) => setColor(data.color.name));
  }, [species]);

  if (loading || !image || !abilities || !types || !color) return null;

  return (
    <Link href={`/${name}`}>
      <div className="relative flex w-52 cursor-pointer flex-col justify-between overflow-hidden rounded-lg shadow-lg">
        <div
          className="absolute -z-20 h-full w-full opacity-30 saturate-50"
          style={{ backgroundColor: color }}
        ></div>
        <h2 className="-mb-5 px-2 pt-5 text-center text-3xl font-bold capitalize">{name}</h2>
        <div className="relative flex aspect-square items-center justify-center">
          <div className="absolute h-3/5 w-full bg-white"></div>
          <Image src={image} alt={name} height="200px" width="200px" />
        </div>
        <div className="-mt-5 p-3">
          <p className="text-xs tracking-widest opacity-50">Abilities:</p>
          <p className="capitalize">{abilities.join(", ")}</p>
        </div>
        <div className="-mt-5 p-3">
          <p className="text-xs tracking-widest opacity-50">Type:</p>
          <p className="capitalize">
            {types.join(", ")}
            <span className=" float-right rounded border bg-white py-0.5 px-2 opacity-50">
              {id}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
