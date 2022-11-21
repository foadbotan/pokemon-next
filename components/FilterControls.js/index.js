import ClearFilters from "../ClearFilters";
import Search from "./Search";
import TypeSelect from "./TypeSelect";

export default function FilterControls(props) {
  const { searchFilter, setSearchFilter, typeFilter, setTypeFilter, allTypes, clearFilters } =
    props;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col justify-center gap-2 sm:my-5 sm:flex-row">
      <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <div className="flex items-center gap-2">
        <TypeSelect allTypes={allTypes} typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
        <ClearFilters clearFilters={clearFilters} />
      </div>
    </div>
  );
}
