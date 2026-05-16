import { CoffeeSteam } from "./sprites/CoffeeSteam";

export function OfficeScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100" />
      <div className="absolute inset-x-6 bottom-12 h-24 rounded-md bg-slate-400 ring-1 ring-slate-500" />
      <div className="absolute left-12 bottom-20 size-16 rounded-sm bg-slate-800 ring-1 ring-slate-900 pixelated">
        <div className="absolute inset-1 bg-slate-700 pixelated" />
        <div className="absolute left-2 top-2 h-1 w-4 bg-rose-300" />
      </div>
      <div className="absolute right-12 bottom-24 size-6 rounded-sm bg-amber-200 pixelated" />
      <div className="absolute right-12 bottom-32">
        <CoffeeSteam />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-slate-300" />
    </div>
  );
}
