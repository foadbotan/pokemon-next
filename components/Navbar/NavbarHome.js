import Image from "next/image";

export default function NavbarHome() {
  return (
    <header className="flex items-center justify-center gap-2 py-5">
      <Image src="/pokemon-logo.svg" width="40" height="40" alt="Pokemon logo" />
      <p className="text-3xl font-black sm:text-5xl">Pokédex</p>
    </header>
  );
}
