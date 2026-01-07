import { Button } from "../../components";
import "./FormTemplate.styles.css";
import { FormTemplateProps } from "./FormTemplate.types";

export const FormTemplate = ({
  children,
  submitLabel,
  loading,
}: FormTemplateProps) => {
  return (
    <div className="form-template">
      {children}
      <Button type="submit" label={submitLabel} loading={loading} fullWidth />
    </div>
  );
};
