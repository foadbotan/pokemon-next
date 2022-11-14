import { BsSearch as SearchIcon } from "react-icons/bs";

export default function Search({ searchFilter, setSearchFilter }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-2xl border bg-white py-1 px-3 outline-2 -outline-offset-1 outline-blue-500 focus-within:outline">
      <SearchIcon />
      <input
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Search..."
        className="w-full bg-transparent placeholder-black outline-none"
      />
    </div>
  );
}
