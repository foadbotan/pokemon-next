import DropdownColumn from "./DropdownColumn";

export default function TypeDropdown({ allTypes, setTypeFilter }) {
  const half = allTypes.length / 2;
  const columnOne = allTypes.slice(0, half);
  const columnTwo = allTypes.slice(half);
  return (
    <div className="absolute top-full z-10 mt-2 flex gap-2 rounded-3xl border bg-white p-4 shadow-xl sm:right-0">
      <DropdownColumn types={columnOne} setTypeFilter={setTypeFilter} />
      <DropdownColumn types={columnTwo} setTypeFilter={setTypeFilter} />
    </div>
  );
}
