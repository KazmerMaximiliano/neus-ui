import type { CSSProperties } from "react";
import type { usePopover } from "../../../hooks/usePopover";
import type { SelectOption } from "../Select.types";

export type SelectListboxProps = {
  popover: ReturnType<typeof usePopover<HTMLButtonElement, HTMLDivElement>>;
  label: string;
  options: SelectOption[];
  multiple?: boolean;
  isSelected: (value: string) => boolean;
  onSelect: (value: string) => void;
  viewSearchBar: boolean;
  searchBarPlaceholder: string;
  listStyle?: CSSProperties;
  optionStyle?: CSSProperties;
};

