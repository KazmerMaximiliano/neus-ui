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

      <div className="form-template__submit">
        <Button type="submit" label={submitLabel} loading={loading} />
      </div>
    </div>
  );
};
