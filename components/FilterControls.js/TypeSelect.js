import { useRef, useState, useEffect } from "react";

import TypeButton from "../TypeButton";
import { BsFilter as FilterIcon } from "react-icons/bs";
import useClickOutside from "../../hooks/useClickOutside";

export default function TypeSelect({ allTypes, typeFilter, setTypeFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const ref = useClickOutside(() => setIsDropdownOpen(false));

  return (
    <div className="relative w-full" ref={ref} onClick={() => setIsDropdownOpen((prev) => !prev)}>
      <div
        className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-white py-1 px-3 outline-2 -outline-offset-1 outline-blue-500 focus:outline"
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
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
      {isDropdownOpen && (
        <div className="absolute top-11 z-10 flex gap-2 rounded-3xl border bg-white p-4">
          <div>
            {allTypes.slice(0, allTypes.length / 2).map((type) => (
              <TypeButton
                key={type.value}
                type={type.value}
                label={type.label}
                className="mb-2 w-full py-1 px-3"
                onClick={() => {
                  console.log("clicked");
                  setTypeFilter((prevTypes) => [...prevTypes, type]);
                }}
              />
            ))}
          </div>
          <div>
            {allTypes.slice(allTypes.length / 2).map((type) => (
              <TypeButton
                key={type.value}
                type={type.value}
                label={type.label}
                className="mb-2 w-full py-1 px-3"
                onClick={() => {
                  setTypeFilter((prevTypes) => [...prevTypes, type]);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
