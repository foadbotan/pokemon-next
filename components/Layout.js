import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children, title, className = "" }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={`container mx-auto ${className}`}>
        <div className="mb-10 flex items-center justify-center">
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
        </div>
        {children}
      </main>
    </div>
  );
}