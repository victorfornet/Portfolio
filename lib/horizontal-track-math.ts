export function getSlotLocalProgress(
  trackProgress: number,
  slotIndex: number,
  slotCount: number,
): number {
  if (slotCount <= 1 || slotIndex <= 0) return 1;
  const step = 1 / (slotCount - 1);
  const windowStart = (slotIndex - 1) * step;
  const local = (trackProgress - windowStart) / step;
  if (local <= 0) return 0;
  if (local >= 1) return 1;
  return local;
}

export type SlotScrollYArgs = {
  wrapperTop: number;
  wrapperHeight: number;
  viewportHeight: number;
  slotIndex: number;
  slotCount: number;
};

export function getSlotScrollY({
  wrapperTop,
  wrapperHeight,
  viewportHeight,
  slotIndex,
  slotCount,
}: SlotScrollYArgs): number {
  if (slotCount <= 1) return wrapperTop;
  const scrollableDistance = wrapperHeight - viewportHeight;
  const t = slotIndex / (slotCount - 1);
  return wrapperTop + t * scrollableDistance;
}
