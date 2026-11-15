import type { CSSProperties } from "react";
import type { usePopover } from "../../../../hooks/usePopover";
import type { SelectOption } from "../../Select.types";

export type SelectListboxProps = {
  readonly boxClassName?: string;
  readonly boxStyle?: CSSProperties;
  readonly checkboxClassName?: string;
  readonly checkboxStyle?: CSSProperties;
  readonly emptyClassName?: string;
  readonly emptyStyle?: CSSProperties;
  readonly iconClassName?: string;
  readonly iconStyle?: CSSProperties;
  readonly listClassName?: string;
  readonly listContentClassName?: string;
  readonly listContentStyle?: CSSProperties;
  readonly optionCheckClassName?: string;
  readonly optionCheckStyle?: CSSProperties;
  readonly optionClassName?: string;
  readonly optionLabelClassName?: string;
  readonly optionLabelStyle?: CSSProperties;
  readonly panelClassName?: string;
  readonly panelStyle?: CSSProperties;
  readonly searchClassName?: string;
  readonly searchInputClassName?: string;
  readonly searchInputStyle?: CSSProperties;
  readonly searchStyle?: CSSProperties;
  readonly popover: ReturnType<typeof usePopover<HTMLButtonElement, HTMLDivElement>>;
  readonly label: string;
  readonly options: readonly SelectOption[];
  readonly multiple?: boolean;
  readonly isSelected: (value: string) => boolean;
  readonly onSelect: (value: string) => void;
  readonly viewSearchBar: boolean;
  readonly searchBarPlaceholder: string;
  readonly listStyle?: CSSProperties;
  readonly optionStyle?: CSSProperties;
};

