import { Parallax } from "@/components/motion/Parallax";
import { Cloud } from "./sprites/Cloud";

export function CampusScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-200 via-sky-100 to-amber-50" />
      <Parallax
        depth={0.2}
        className="absolute inset-x-0 top-6 flex justify-around opacity-80"
      >
        <Cloud size={70} />
        <Cloud size={90} />
      </Parallax>
      <div className="absolute bottom-12 left-1/2 h-40 w-48 -translate-x-1/2 rounded-t-md bg-amber-100 ring-2 ring-amber-300 pixelated" />
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 h-40 w-48">
        {[0, 1, 2].map((c) => (
          <div
            key={c}
            className="absolute bottom-0 h-32 w-3 bg-amber-200"
            style={{ left: 12 + c * 60 }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 bg-emerald-400 pixelated" />
    </div>
  );
}
