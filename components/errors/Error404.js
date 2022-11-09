import Link from "next/link";

export default function Error404({ error, query }) {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-2xl text-red-500">ERROR 404: {error}</h1>
      <p className="text-center">Pokemon: {query.pokemon}</p>
      <Link href="/">
        <button className="mt-5 rounded bg-green-600 py-1 px-5 text-lg text-white">
          ← Return Home
        </button>
      </Link>
    </div>
  );
}
