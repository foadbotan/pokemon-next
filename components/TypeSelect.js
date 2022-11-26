import { useState } from "react";

import { BsFilter as FilterIcon } from "react-icons/bs";
import useClickOutside from "/hooks/useClickOutside";
import TypeButton from "./TypeButton";

export default function TypeSelect({ allTypes, store }) {
  const [state, dispatch] = store;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useClickOutside(() => setIsDropdownOpen(false));

  function handleSelectType(type) {
    if (state.typeFilter.includes(type)) return;
    dispatch({ typeFilter: [...state.typeFilter, type] });
  }

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

        {state.typeFilter.length > 0 && (
          <div className="flex gap-1">
            {state.typeFilter.map((type) => (
              <TypeButton
                key={type}
                type={type}
                className="p-1"
                onClick={() => {
                  dispatch({ typeFilter: state.typeFilter.filter((t) => t !== type) });
                }}
              />
            ))}
          </div>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full z-10 mt-2 grid w-72 grid-cols-2 gap-2 rounded-3xl border bg-white p-4 shadow-xl sm:right-0">
          {allTypes.map((type) => (
            <TypeButton
              key={type}
              type={type}
              label={type}
              className="py-1 px-3"
              onClick={() => handleSelectType(type)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
