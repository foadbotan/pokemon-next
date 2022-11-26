import TypeButton from "./TypeButton";

export default function DropdownColumn({ types, setTypeFilter }) {
  function addType(type) {
    setTypeFilter((prevTypes) => {
      return prevTypes.includes(type) ? prevTypes : [...prevTypes, type];
    });
  }

  return (
    <div>
      {types.map((type) => (
        <TypeButton
          key={type}
          type={type}
          className="mb-2 w-full py-1 px-3"
          onClick={() => addType(type)}
        />
      ))}
    </div>
  );
}
