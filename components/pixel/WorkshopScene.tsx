export function WorkshopScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-violet-700 to-indigo-800" />
      <div className="absolute inset-x-1/4 top-8 h-20 rounded-sm bg-slate-900 ring-2 ring-slate-700 pixelated">
        <div className="absolute inset-1 bg-slate-800 pixelated" />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-1 bg-emerald-400/80 pixelated"
            style={{ top: 6 + i * 4, left: 8, width: 30 + i * 10 }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-amber-900 pixelated" />
    </div>
  );
}
