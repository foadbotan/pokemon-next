import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import { BsFilter as FilterIcon } from "react-icons/bs";
import TypeButton from "../TypeButton";

export default function TypeSelect({ allTypes, typeFilter, setTypeFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleFocus = () => setIsDropdownOpen(true);
    const handleBlur = () => setIsDropdownOpen(false);
    const currentRef = ref.current;
    currentRef.addEventListener("focus", handleFocus);
    currentRef.addEventListener("blur", handleBlur);
    return () => {
      currentRef.removeEventListener("focus", handleFocus);
      currentRef.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="flex w-full items-center justify-between gap-4 rounded-2xl border bg-white py-1 px-3 outline-2 -outline-offset-1 outline-blue-500 focus:outline"
        tabIndex={0}
        ref={ref}
      >
        <div className="flex items-center gap-2">
          <FilterIcon />
          <div>Type</div>
        </div>
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
      {isDropdownOpen && (
        <div className="absolute top-11 z-10 rounded-2xl border bg-white p-4">Dropdown</div>
      )}
    </div>
  );
}
