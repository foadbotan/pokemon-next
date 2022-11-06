import Image from "next/image";

export default function NavbarHome() {
  return (
    <header className="flex items-center justify-center gap-2 py-5">
      <div className="flex w-10 sm:w-16">
        <Image src="/pokemon-logo.svg" width="100" height="100" alt="Pokemon logo" />
      </div>
      <p className="text-3xl font-black sm:text-5xl">Pokédex</p>
    </header>
  );
}
