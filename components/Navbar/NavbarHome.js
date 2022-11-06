import Image from "next/image";

export default function NavbarHome() {
  return (
    <header className="mx-auto flex w-[calc(20vw+10rem)] justify-center p-5 sm:p-10">
      <Image src="/pokemon-logo.svg" width="300" height="50" alt="Pokemon logo" />
    </header>
  );
}
