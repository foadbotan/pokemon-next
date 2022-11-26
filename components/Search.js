import { BsSearch as SearchIcon } from "react-icons/bs";

export default function Search({ store }) {
  const [state, dispatch] = store;
  return (
    <div className="flex w-full items-center gap-2 rounded-full border-2 bg-white py-1 px-3 focus-within:border-blue-500">
      <SearchIcon />
      <input
        value={state.searchFilter}
        onChange={(e) => dispatch({ searchFilter: e.target.value })}
        placeholder="Search..."
        className="w-full bg-transparent placeholder-black outline-none"
      />
    </div>
  );
}
