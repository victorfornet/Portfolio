import { Flag } from "./sprites/Flag";

export function HorizonScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-300 via-amber-200 to-amber-100" />
      <div className="absolute left-1/2 top-1/3 size-20 -translate-x-1/2 rounded-full bg-amber-300 blur-[1px]" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 size-0 border-l-[80px] border-r-[80px] border-b-[120px] border-l-transparent border-r-transparent border-b-slate-600" />
      <div className="absolute left-1/2 bottom-[120px] -translate-x-1/2">
        <Flag />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-amber-700 pixelated" />
    </div>
  );
}
