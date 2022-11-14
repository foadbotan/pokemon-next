import TypeButton from "../TypeButton";

export default function DropdownColumn({ types, setTypeFilter }) {
  return (
    <div>
      {types.map((type) => (
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
  );
}
