import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { COLORS } from "../constants/colors";

function Pokemon({ name, id, url, types, image }) {
  let backgroundColors = types.map((type) => COLORS[type]).join();
  if (types.length === 1) backgroundColors = `${backgroundColors}, ${backgroundColors}`;

  return (
    <Link href={`/${name}`}>
      <div
        className="flex w-40 cursor-pointer flex-col justify-between overflow-hidden rounded-md shadow-md transition duration-300 hover:rotate-1 hover:scale-105 hover:shadow-lg hover:brightness-105"
        style={{ background: `linear-gradient(${backgroundColors})` }}
      >
        <div className="px-2 pt-2">
          <p className="text-xs opacity-50">#{`${id}`.padStart(3, "0")}</p>
          <h3 className="break-words text-lg font-black capitalize text-white">{name}</h3>
        </div>

        <div className="m-1 flex h-full flex-col items-center justify-around gap-2 rounded bg-white p-2">
          <Image src={image} width="200" height="200" alt={name} />
          {types && (
            <div className="flex gap-1 self-start ">
              {types.map((type) => (
                <div
                  key={type}
                  className={`rounded px-1 py-0.5 `}
                  style={{ backgroundColor: COLORS[type] }}
                >
                  <div className="text-[12px] font-semibold uppercase text-white">{type}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(Pokemon);
