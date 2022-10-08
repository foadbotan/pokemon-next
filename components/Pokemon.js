import { useEffect, useState } from "react";
import Image from "next/image";

export default function Pokemon({ url, name }) {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [abilities, setAbilities] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setImage(data.sprites.other["official-artwork"].front_default);
        setAbilities(data.abilities.map(({ ability }) => ability.name));
      });
  }, [url]);

  if (loading) return null;

  return (
    <div className="flex w-60 flex-col rounded-lg bg-white shadow-md">
      <h2 className="-mb-5 pt-5 text-center text-4xl font-bold capitalize">{name}</h2>
      <div className="relative flex aspect-square items-center justify-center">
        <div className="absolute h-1/2 w-full  bg-gray-200"></div>
        <Image src={image} alt={name} height="200px" width="200px" />
      </div>
      <div className="-mt-5 p-3">
        <p className="text-xs tracking-widest text-gray-500">Abilities:</p>
        <p className="font-semibold capitalize">{abilities.join(", ")}</p>
      </div>
    </div>
  );
}
