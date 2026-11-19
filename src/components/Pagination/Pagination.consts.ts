import type { PaginationLabels } from "./Pagination.types";

export const PAGINATION_LABELS: Required<PaginationLabels> = {
  navigation: "Pagination",
  previous: "Previous page",
  next: "Next page",
  page: (page) => `Page ${page}`,
  pageSize: "Items per page",
};
