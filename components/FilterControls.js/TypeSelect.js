import { useState } from "react";

import TypeButton from "../TypeButton";
import { BsFilter as FilterIcon } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";
import TypeDropdown from "./TypeDropdown";

export default function TypeSelect({ allTypes, typeFilter, setTypeFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div className="relative w-full" ref={ref} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <div
        className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-white py-1 px-3 outline-2 -outline-offset-1 outline-blue-500 focus:outline"
        tabIndex={0}
      >
        <div className="flex select-none items-center gap-2">
          <FilterIcon />
          <div>Type</div>
        </div>
        <div className="flex gap-1">
          {typeFilter.map(({ value }) => (
            <TypeButton
              key={value}
              type={value}
              className="p-1"
              onClick={() => {
                setTypeFilter(typeFilter.filter((type) => type.value !== value));
              }}
            />
          ))}
        </div>
      </div>
      {isDropdownOpen && <TypeDropdown allTypes={allTypes} setTypeFilter={setTypeFilter} />}
    </div>
  );
}
