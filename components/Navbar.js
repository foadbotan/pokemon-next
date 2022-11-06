import Image from "next/image";
import Link from "next/link";
import { IoArrowBackOutline as BackArrow } from "react-icons/io5";

export default function Navbar({ name, id }) {
  return (
    <header className="container mx-auto p-5">
      {name ? (
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-2 text-white">
            <BackArrow size="30" />
            <p className="text-2xl font-black ">{name}</p>
            <p className="ml-auto text-xs font-bold">#{`${id}`.padStart(3, "0")}</p>
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Image src="/pokemon-logo.svg" width="40" height="40" alt="Pokemon logo" />
          <p className="text-3xl font-black">Pokédex</p>
        </div>
      )}
    </header>
  );
}
