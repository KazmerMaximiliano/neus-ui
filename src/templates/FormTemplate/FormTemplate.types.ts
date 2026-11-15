import type { CSSProperties, ReactNode } from "react";

export type FormTemplateProps = {
  readonly actionsClassName?: string;
  readonly children: ReactNode;
  readonly submitLabel: string;
  readonly loading?: boolean;
  readonly actions?: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly actionsStyle?: CSSProperties;
  readonly columns?: number;
  readonly tabletColumns?: number;
  readonly mobileColumns?: number;
  readonly gap?: CSSProperties["gap"];
};
