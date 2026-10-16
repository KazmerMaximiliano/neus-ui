import type { CSSProperties } from "react";
import { Button } from "../../components";
import "./FormTemplate.styles.css";
import type { FormTemplateProps } from "./FormTemplate.types";
import { resolveColumns } from "./FormTemplate.utils";

/** Responsive layout only; its consumer owns the form element and submission. */
export const FormTemplate = ({ children, submitLabel, loading, actions, className, style, actionsStyle, columns = 2, tabletColumns = 2, mobileColumns = 1, gap }: FormTemplateProps) => (
  <div className={["form-template", className].filter(Boolean).join(" ")} style={{
    "--form-template-columns": resolveColumns(columns, 2),
    "--form-template-tablet-columns": resolveColumns(tabletColumns, 2),
    "--form-template-mobile-columns": resolveColumns(mobileColumns, 1),
    ...(gap !== undefined ? { "--form-template-gap": typeof gap === "number" ? `${gap}px` : gap } : {}),
    ...style,
  } as CSSProperties}>
    {children}
    <div className="form-template__submit" style={actionsStyle}>
      {actions ?? <Button type="submit" label={submitLabel} loading={loading} />}
    </div>
  </div>
);
