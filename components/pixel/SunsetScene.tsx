import { Cloud } from "./sprites/Cloud";

export function SunsetScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-200 to-sky-300" />
      <div className="absolute right-10 top-1/3">
        <Cloud size={100} />
      </div>
      <div className="absolute left-8 top-1/2">
        <Cloud size={80} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-emerald-500" />
      <div className="absolute left-1/2 bottom-16 size-20 -translate-x-1/2 rounded-sm bg-slate-700 ring-2 ring-slate-800 pixelated" />
    </div>
  );
}
