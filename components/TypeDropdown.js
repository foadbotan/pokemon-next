import TypeButton from "./TypeButton";

export default function TypeDropdown({ allTypes, handleClick }) {
  return (
    <div className="absolute top-full z-10 mt-2 grid w-72 grid-cols-2 gap-2 rounded-3xl border bg-white p-4 shadow-xl sm:right-0">
      {allTypes.map((type) => (
        <TypeButton
          key={type}
          type={type}
          label={type}
          className="py-1 px-3"
          onClick={() => handleClick(type)}
        />
      ))}
    </div>
  );
}
