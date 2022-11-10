import Select from "react-select";
import { BsSearch as SearchIcon } from "react-icons/bs";

export default function FilterControls(props) {
  const { searchFilter, setSearchFilter, typeFilter, setTypeFilter, allTypes } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row lg:w-80 lg:flex-col">
      <div className="flex w-full items-center rounded-md border border-zinc-300 bg-white outline-2 outline-blue-500 focus-within:outline">
        <SearchIcon className="mx-2" />
        <span className="h-5 w-px bg-gray-300"></span>
        <input
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent py-1 px-4 outline-none"
        />
      </div>
      <Select
        options={allTypes}
        isMulti
        value={typeFilter}
        onChange={(selected) => setTypeFilter(selected)}
        className="w-full"
        placeholder="Select type"
        instanceId="type-select" // fixes warning about duplicate ids
      />
    </div>
  );
}
