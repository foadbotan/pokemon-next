import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { COLORS } from "../constants/colors";

function Pokemon({ name, id, url, types, image }) {
  const color = COLORS[types[0]];
  return (
    <Link href={`/${name}`}>
      <div
        className="relative flex aspect-square w-28 cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition hover:scale-105 hover:border-2 sm:w-36"
        style={{ borderColor: color }}
      >
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
          #{`${id}`.padStart(3, "0")}
        </p>
        <div className="p-5">
          <Image src={image} width="200" height="200" alt={name} />
        </div>
        <h3
          className="absolute bottom-0 left-0 w-full p-2 text-center text-xs font-bold capitalize sm:text-sm"
          style={{ color }}
        >
          {name}
        </h3>
      </div>
    </Link>
  );
}

export default memo(Pokemon);
