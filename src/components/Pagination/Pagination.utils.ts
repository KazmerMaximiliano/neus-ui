import type { PaginationItem } from "./Pagination.types";

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

/**
 * The first and last pages, the current one and its siblings, with an ellipsis for each gap.
 * The count stays the same as the current page moves, so the buttons do not shift.
 */
export const getPaginationItems = (page: number, totalPages: number, siblingCount = 1): PaginationItem[] => {
  const slots = siblingCount * 2 + 5;
  if (totalPages <= slots) return range(1, totalPages);
  const start = Math.max(page - siblingCount, 1);
  const end = Math.min(page + siblingCount, totalPages);
  const edge = slots - 2;
  if (start <= 3) return [...range(1, edge), "end-ellipsis", totalPages];
  if (end >= totalPages - 2) return [1, "start-ellipsis", ...range(totalPages - edge + 1, totalPages)];
  return [1, "start-ellipsis", ...range(start, end), "end-ellipsis", totalPages];
};
