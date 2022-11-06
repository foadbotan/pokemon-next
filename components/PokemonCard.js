import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { COLORS } from "../constants/colors";

function Pokemon({ name, id, url, types, image }) {
  const color = COLORS[types[0]];

  return (
    <Link href={`/${name}`}>
      <div
        className="relative flex aspect-square w-28 cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-white transition hover:scale-105 sm:w-36 lg:w-44"
        style={{ borderColor: color }}
      >
        <p className="absolute right-2 top-1 text-xs" style={{ color }}>
          #{`${id}`.padStart(3, "0")}
        </p>
        <div
          className="absolute top-0 right-0 aspect-square w-60 rounded-full sm:w-96"
          style={{ backgroundColor: color }}
        ></div>
        <div className="p-5">
          <Image src={image} width="200" height="200" alt={name} />
        </div>
        <h3
          className="absolute bottom-0 left-0 w-full p-2 text-xs font-bold capitalize text-white sm:text-sm lg:text-base"
          style={{ textShadow: `0 0 2px ${color}` }}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default memo(Pokemon);
