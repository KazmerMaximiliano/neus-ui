import type { CSSProperties } from "react";
import type { usePopover } from "../../../hooks/usePopover";
import type { SelectOption } from "../Select.types";

export type SelectListboxProps = {
  boxClassName?: string;
  boxStyle?: CSSProperties;
  checkboxClassName?: string;
  checkboxStyle?: CSSProperties;
  emptyClassName?: string;
  emptyStyle?: CSSProperties;
  iconClassName?: string;
  iconStyle?: CSSProperties;
  listClassName?: string;
  listContentClassName?: string;
  listContentStyle?: CSSProperties;
  optionCheckClassName?: string;
  optionCheckStyle?: CSSProperties;
  optionClassName?: string;
  optionLabelClassName?: string;
  optionLabelStyle?: CSSProperties;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  searchClassName?: string;
  searchInputClassName?: string;
  searchInputStyle?: CSSProperties;
  searchStyle?: CSSProperties;
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

