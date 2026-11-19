import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type TabsVariant = "line" | "contained";

export type TabsItem = {
  readonly value: string;
  readonly label: ReactNode;
  readonly content: ReactNode;
  readonly disabled?: boolean;
};

export type TabsProps = Omit<ComponentPropsWithRef<"div">, "children" | "onChange" | "defaultValue"> & {
  readonly items: readonly TabsItem[];
  /** The selected tab (controlled). */
  readonly value?: string;
  /** The tab selected first (uncontrolled); the first enabled tab when omitted. */
  readonly defaultValue?: string;
  readonly onChange?: (value: string) => void;
  /** Accessible name of the tab list, such as "Project settings". */
  readonly label?: string;
  readonly variant?: TabsVariant;
  readonly listClassName?: string;
  readonly listStyle?: CSSProperties;
  readonly tabClassName?: string;
  readonly tabStyle?: CSSProperties;
  readonly panelClassName?: string;
  readonly panelStyle?: CSSProperties;
};

export type TabsStoryArgs = TabsProps & {
  readonly designSystem: DesignSystemId;
};
