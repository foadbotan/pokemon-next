import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { COLORS } from "../constants/colors";

export const IMAGES_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/`;

function Pokemon({ name, id, types }) {
  const color = COLORS[types[0]];
  return (
    <Link href={`/${name}`}>
      <div className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition ease-in-out hover:scale-105 hover:shadow-lg ">
        <div className="absolute -top-5 -left-5 flex w-[150%] rotate-12 items-end gap-5 opacity-80">
          {types.map((type, i) => (
            <div
              key={type + name}
              className="relative grid items-center rounded-full"
              style={{
                backgroundColor: COLORS[type],
                borderColor: COLORS[type],
                width: 50 / (i + 1) + "%",
                aspectRatio: "1",
              }}
            >
              <Image
                src={`/icons/${type}.svg`}
                layout="fill"
                alt={type}
                className="scale-50 opacity-40"
              />
            </div>
          ))}
        </div>
        <p className="absolute right-2 top-1 text-xs" style={{ color }}>
          #{id}
        </p>
        <div className="p-2 pt-1">
          <Image
            src={`${IMAGES_URL}${id}.png`}
            width="300"
            height="300"
            alt={name}
          />
        </div>
        <h3
          className="absolute bottom-0 left-0 w-full pb-[5%] text-center font-bold capitalize leading-none"
          style={{
            color,
            background: `linear-gradient(hsla(0,0%,0%,0) 0%, white 50%)`,
          }}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default memo(Pokemon);
