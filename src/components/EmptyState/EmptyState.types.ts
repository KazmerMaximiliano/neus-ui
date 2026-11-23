import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import type { DesignSystemId } from "../../design-systems";

export type EmptyStateTitleElement = "h2" | "h3" | "h4" | "p";

type EmptyStateOwnProps = {
  readonly title: ReactNode;
  /** The title's element, by the place of the empty region in the page outline. */
  readonly titleAs?: EmptyStateTitleElement;
  /** Text of a paragraph under the title. */
  readonly description?: ReactNode;
  /** An icon or illustration above the title; mark it `aria-hidden` when it only decorates. */
  readonly media?: ReactNode;
  /** The way forward: one Button, or a primary and a secondary. */
  readonly actions?: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly mediaClassName?: string;
  readonly mediaStyle?: CSSProperties;
  readonly titleClassName?: string;
  readonly titleStyle?: CSSProperties;
  readonly descriptionClassName?: string;
  readonly descriptionStyle?: CSSProperties;
  readonly actionsClassName?: string;
  readonly actionsStyle?: CSSProperties;
};

/** Native `<div>` attributes (role="status", id, aria-*…) and its ref. */
type EmptyStateNativeProps = Omit<
  ComponentPropsWithRef<"div">,
  keyof EmptyStateOwnProps | "children" | "dangerouslySetInnerHTML"
>;

export type EmptyStateProps = EmptyStateOwnProps & EmptyStateNativeProps;

export type EmptyStateStoryArgs = EmptyStateProps & {
  readonly designSystem: DesignSystemId;
};
