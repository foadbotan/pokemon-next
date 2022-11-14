import ClearFilters from "../ClearFilters";

export default function ErrorSearchEmpty({ clearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">No Pokemon found</h1>
      <ClearFilters clearFilters={clearFilters} />
    </div>
  );
}
