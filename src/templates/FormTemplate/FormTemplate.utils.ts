/** A grid must have at least one finite, integral column. */
export const resolveColumns = (value: number | undefined, fallback: number) =>
  value !== undefined && Number.isFinite(value) ? Math.max(1, Math.floor(value)) : fallback;
