import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { COLORS } from "../constants/colors";

function Pokemon({ name, id, url, types, image }) {
  return (
    <Link href={`/${name}`}>
      <div className="w-60 cursor-pointer overflow-hidden rounded-md shadow-md transition duration-300 hover:rotate-1 hover:scale-105 hover:shadow-lg hover:brightness-105">
        <div className="bg-gray-300 p-3">
          <p className="text-xs">#{`${id}`.padStart(3, "0")}</p>
          <h3 className="break-words text-2xl font-black capitalize opacity-80">{name}</h3>
        </div>

        <div className="flex flex-col items-center gap-2 p-3">
          <Image src={image} width="200" height="200" alt={name} />
          {types && (
            <div className="flex gap-2 self-start ">
              {types.map((type) => (
                <div
                  key={type}
                  className={`rounded-full px-2 py-1 text-xs font-semibold uppercase`}
                  style={{ backgroundColor: COLORS[type] }}
                >
                  <div className="opacity-75">{type}</div>
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
