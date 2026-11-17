import type { FieldOutlineProps } from "./FieldOutline.types";

/**
 * The border of a field whose label floats, drawn by a fieldset so the raised label sits in a gap of
 * the border with nothing painted behind it, as Material's outlined text field does. Where no label
 * floats, field.css gives it no width and the field draws its own border. The legend sizes the gap
 * from the label through CSS generated content, so the label text appears once in the document.
 */
export const FieldOutline = ({ label, required = false }: FieldOutlineProps) => (
  <fieldset className="field__outline" aria-hidden="true">
    <legend className="field__notch" data-label={label} data-required={required || undefined} />
  </fieldset>
);
