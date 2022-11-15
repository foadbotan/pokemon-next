import { BsSearch as SearchIcon } from "react-icons/bs";

export default function Search({ searchFilter, setSearchFilter }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-full border-2 bg-white py-2 px-4 focus-within:border-blue-500">
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
