import { Children, Fragment, isValidElement, type ReactNode } from "react";

export const toList = (value: string | readonly string[] | null | undefined) =>
  value == null ? [] : typeof value === "string" ? [value] : [...value];

/** The values of the enabled toggles written inside the group or its fragments, in order. */
export const enabledValues = (children: ReactNode): string[] =>
  Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ value?: unknown; disabled?: boolean; children?: ReactNode }>(child)) return [];
    if (child.type === Fragment) return enabledValues(child.props.children);
    return typeof child.props.value === "string" && !child.props.disabled ? [child.props.value] : [];
  });
