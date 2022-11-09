export default function ErrorSearchEmpty({ resetFilters }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">No Pokemon found</h1>
      <button
        onClick={resetFilters}
        className="rounded bg-red-400 py-1 px-5 text-white hover:bg-red-500"
      >
        Reset
      </button>
    </div>
  );
}
