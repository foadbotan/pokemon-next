import Image from "next/image";

export default function NavbarHome() {
  return (
    <header className="mx-auto flex w-60 justify-center py-5 sm:w-80 sm:py-10">
      <Image src="/pokemon-logo.svg" width="300" height="50" alt="Pokemon logo" />
    </header>
  );
}
