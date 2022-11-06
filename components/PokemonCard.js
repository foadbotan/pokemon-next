import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { COLORS } from "../constants/colors";

function Pokemon({ name, id, url, types, image }) {
  const color = COLORS[types[0]];

  return (
    <Link href={`/${name}`}>
      <div
        className="relative flex h-fit w-24 cursor-pointer flex-col overflow-hidden rounded-2xl border-2 transition hover:scale-105 sm:w-32 lg:w-44"
        style={{ backgroundColor: color, borderColor: color }}
      >
        <p className="absolute top-2 right-2 text-xs" style={{ color }}>
          #{`${id}`.padStart(3, "0")}
        </p>
        <div className="flex aspect-square w-full items-end  rounded-xl bg-white px-2">
          <Image src={image} width="200" height="200" alt={name} />
        </div>
        <h3 className="p-1 text-center text-xs font-bold capitalize leading-none text-white sm:text-sm lg:text-base">
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default memo(Pokemon);
