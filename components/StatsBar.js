export default function StatsBar({ stat, isDark }) {
  const percent = Math.round((stat.base_stat / 255) * 100);

  return (
    <div>
      <div className="flex justify-between py-1 text-sm font-medium leading-none">
        <span className="uppercase">{stat.name}</span>
        <span>
          {stat.base_stat} <span className="text-[8px]"> / 255</span>
        </span>
      </div>
      <div className={`w-full rounded-full bg-opacity-20 ${isDark ? "bg-black" : "bg-white"}`}>
        <div
          className={`h-2.5 rounded-full ${isDark ? "bg-black" : "bg-white"}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
