import Link from "next/link";
import { IoArrowBackOutline as BackArrow } from "react-icons/io5";

export default function NavbarPokemon({ name, id }) {
  return (
    <header className="container mx-auto p-5 sm:py-8">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-2 transition hover:text-black hover:opacity-70">
            <BackArrow size="30" />
            <p className="text-3xl font-black">{name}</p>
          </div>
        </Link>
        <p className="font-bold">#{`${id}`.padStart(3, "0")}</p>
      </div>
    </header>
  );
}
