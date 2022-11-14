import Image from "next/image";
import { COLORS } from "../constants/colors";

export default function TypeButton({ onClick, type, label, className }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-white text-center text-xs font-medium uppercase text-white hover:brightness-90 ${className}`}
      style={{ backgroundColor: COLORS[type] }}
    >
      {label && label}
      <div className="flex">
        <Image src={`/icons/${type}.svg`} alt={type} width="12" height="12" />
      </div>
    </button>
  );
}
