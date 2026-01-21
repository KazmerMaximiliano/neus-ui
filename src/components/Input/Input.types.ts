export type InputProps = {
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  type?: "text" | "password" | "email" | "number" | "color" | "tel" | "url";
  min?: string | number;
  max?: string | number;
  step?: string | number;
  onChange?: (value: string) => void;
};
