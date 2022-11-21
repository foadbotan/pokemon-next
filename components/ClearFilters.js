import { AiOutlineClose as CloseIcon } from "react-icons/ai";

export default function ClearFilters({ clearFilters }) {
  return (
    <button
      className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-1.5 text-white hover:bg-red-600"
      onClick={clearFilters}
    >
      <CloseIcon size="16" />
      <div>Clear</div>
    </button>
  );
}
