import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";
import type { ToggleSize } from "../Toggle";

type ToggleGroupBaseProps = {
  /** Names the group for assistive technology; `aria-labelledby` replaces it with visible text. */
  readonly label: string;
  readonly orientation?: "horizontal" | "vertical";
  /** Size of every toggle that does not set its own. */
  readonly size?: ToggleSize;
  readonly disabled?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
};

type ToggleGroupSingleProps = {
  /** One toggle pressed at a time, like radios: pressing it again keeps it. */
  readonly type?: "single";
  readonly value?: string | null;
  readonly defaultValue?: string | null;
  readonly onChange?: (value: string) => void;
};

type ToggleGroupMultipleProps = {
  readonly type: "multiple";
  readonly value?: readonly string[];
  readonly defaultValue?: readonly string[];
  readonly onChange?: (value: string[]) => void;
};

/** Native `<div>` attributes (id, aria-*, data-*…) and its ref. */
type ToggleGroupNativeProps = Omit<
  ComponentPropsWithRef<"div">,
  keyof ToggleGroupBaseProps | keyof ToggleGroupMultipleProps | "role" | "dangerouslySetInnerHTML"
>;

export type ToggleGroupProps = ToggleGroupBaseProps &
  ToggleGroupNativeProps &
  (ToggleGroupSingleProps | ToggleGroupMultipleProps);

export type ToggleGroupStoryArgs = ToggleGroupBaseProps & {
  readonly designSystem: DesignSystemId;
  readonly type: "single" | "multiple";
  readonly value?: string;
  readonly iconOnly: boolean;
  readonly onChange?: (value: string | string[]) => void;
};
