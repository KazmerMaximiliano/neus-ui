import type { CSSProperties, ReactNode } from "react";

export type FormTemplateProps = {
  actionsClassName?: string;
  children: ReactNode;
  submitLabel: string;
  loading?: boolean;
  actions?: ReactNode;
  className?: string;
  style?: CSSProperties;
  actionsStyle?: CSSProperties;
  columns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  gap?: CSSProperties["gap"];
};
