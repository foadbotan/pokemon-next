import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children, title, className = "", style = {} }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <header className="fixed z-10 flex w-full items-center justify-center bg-white shadow-md">
        <Link href="/">
          <div>
            <Image
              src="/pokemon-logo.svg"
              width="200"
              height="100"
              alt="Pokemon logo"
              className=" cursor-pointer"
            />
          </div>
        </Link>
      </header>
      <main style={style} className={`pt-32 ${className}`}>
        {children}
      </main>
    </div>
  );
}
