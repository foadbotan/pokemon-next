import { AiOutlineClose as CloseIcon } from "react-icons/ai";

export default function ClearFilters({ clearFilters }) {
  return (
    <button
      className="flex items-center gap-2 rounded-2xl bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={clearFilters}
    >
      <CloseIcon />
      <div>Clear</div>
    </button>
  );
}