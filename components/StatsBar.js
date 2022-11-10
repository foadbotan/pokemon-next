export default function StatsBar({ stat }) {
  const percent = Math.round((stat.base_stat / 255) * 100);

  return (
    <div>
      <div className="flex justify-between py-1 text-sm font-medium leading-none text-white">
        <span className="uppercase">{stat.name}</span>
        <span>
          {stat.base_stat} <span className="text-[8px]"> / 255</span>
        </span>
      </div>
      <div className="w-full rounded-full bg-[hsla(0,0%,100%,0.3)]">
        <div
          className="h-2.5 rounded-full bg-white opacity-70"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
