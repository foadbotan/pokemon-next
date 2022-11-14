import TypeButton from "../TypeButton";

export default function DropdownColumn({ types, setTypeFilter }) {
  function addType(type) {
    setTypeFilter((prevTypes) => {
      const hasType = prevTypes.some(({ value }) => value === type.value);
      return hasType ? prevTypes : [...prevTypes, type];
    });
  }

  return (
    <div>
      {types.map((type) => (
        <TypeButton
          key={type.value}
          type={type.value}
          label={type.label}
          className="mb-2 w-full py-1 px-3"
          onClick={() => addType(type)}
        />
      ))}
    </div>
  );
}
