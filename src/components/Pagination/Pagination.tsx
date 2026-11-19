import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "../IconButton";
import { Select } from "../Select";
import type { PaginationProps } from "./Pagination.types";
import { PAGINATION_LABELS } from "./Pagination.consts";
import { getPaginationItems } from "./Pagination.utils";
import "./Pagination.styles.css";

const join = (...names: (string | undefined)[]) =>
  names.filter(Boolean).join(" ");

export const Pagination = ({
  page,
  totalPages,
  onChange,
  siblingCount = 1,
  variant = "pages",
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  labels,
  className,
  listClassName,
  listStyle,
  pageClassName,
  pageStyle,
  ellipsisClassName,
  ellipsisStyle,
  infoClassName,
  infoStyle,
  pageSizeClassName,
  pageSizeStyle,
  ...props
}: PaginationProps) => {
  const text = { ...PAGINATION_LABELS, ...labels };
  const last = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), last);
  const go = (next: number) => {
    if (next !== current) onChange?.(next);
  };

  const previous = (
    <IconButton
      className="pagination__previous"
      icon={ChevronLeft}
      label={text.previous}
      size="small"
      variant="text"
      disabled={current <= 1}
      onClick={() => go(current - 1)}
    />
  );
  const next = (
    <IconButton
      className="pagination__next"
      icon={ChevronRight}
      label={text.next}
      size="small"
      variant="text"
      disabled={current >= last}
      onClick={() => go(current + 1)}
    />
  );

  return (
    <nav
      aria-label={text.navigation}
      {...props}
      className={join("pagination", `pagination--${variant}`, className)}
    >
      {variant === "compact" ? (
        <>
          {previous}
          <span
            className={join("pagination__info", infoClassName)}
            style={infoStyle}
            aria-live="polite"
          >
            {current} / {last}
          </span>
          {next}
        </>
      ) : (
        <ul
          className={join("pagination__list", listClassName)}
          style={listStyle}
        >
          <li>{previous}</li>
          {getPaginationItems(current, last, siblingCount).map((item) =>
            typeof item === "number" ? (
              <li key={item}>
                <button
                  type="button"
                  aria-label={text.page(item)}
                  aria-current={item === current ? "page" : undefined}
                  className={join("pagination__page", pageClassName)}
                  style={pageStyle}
                  onClick={() => go(item)}
                >
                  {item}
                </button>
              </li>
            ) : (
              <li key={item} aria-hidden>
                <span
                  className={join("pagination__ellipsis", ellipsisClassName)}
                  style={ellipsisStyle}
                >
                  …
                </span>
              </li>
            ),
          )}
          <li>{next}</li>
        </ul>
      )}
      {pageSizeOptions && pageSize !== undefined && (
        <Select
          className={join("pagination__page-size", pageSizeClassName)}
          style={pageSizeStyle}
          label={text.pageSize}
          labelClassName="pagination__page-size-label"
          labelPlacement="external"
          size="small"
          options={pageSizeOptions.map((option) => ({
            value: String(option),
            label: String(option),
          }))}
          value={String(pageSize)}
          onChange={(option) => onPageSizeChange?.(Number(option))}
        />
      )}
    </nav>
  );
};
