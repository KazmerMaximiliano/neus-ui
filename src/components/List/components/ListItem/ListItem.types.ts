import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../../../design-systems";

export type ListItemProps = Omit<ComponentPropsWithRef<"li">, "title" | "style"> & {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  /** An icon, avatar or picture before the text. */
  readonly leading?: ReactNode;
  /** Meta text or a control after the text: a date, a Badge, a Switch, a Button. */
  readonly trailing?: ReactNode;
  /** More content under the description. */
  readonly children?: ReactNode;
  readonly style?: CSSProperties;
  readonly leadingClassName?: string;
  readonly leadingStyle?: CSSProperties;
  readonly bodyClassName?: string;
  readonly bodyStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
  readonly trailingClassName?: string;
  readonly trailingStyle?: CSSProperties;
};

export type ListItemStoryArgs = ListItemProps & {
  readonly designSystem: DesignSystemId;
};
