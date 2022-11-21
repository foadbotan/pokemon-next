import { useState } from "react";

import TypeButton from "../TypeButton";
import { BsFilter as FilterIcon } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";
import TypeDropdown from "./TypeDropdown";

export default function TypeSelect({ allTypes, typeFilter, setTypeFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div className="relative" ref={ref} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <div
        className="flex items-center justify-between gap-4 rounded-full border-2 bg-white px-3 outline-none focus:border-blue-500"
        tabIndex={0}
      >
        <div className="my-1 flex select-none items-center gap-2">
          <FilterIcon />
          <div>Type</div>
        </div>
        {typeFilter.length > 0 && (
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
        )}
      </div>
      {isDropdownOpen && <TypeDropdown allTypes={allTypes} setTypeFilter={setTypeFilter} />}
    </div>
  );
}
