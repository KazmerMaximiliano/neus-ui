import { useContext } from "react";
import { Card } from "../../../../components/Card/Card";
import { TestimonialListContext } from "../../TestimonialList.context";
import "./Testimonial.styles.css";
import type { TestimonialProps } from "./Testimonial.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** One quote with its author: a figure, inside a list item when it belongs to a TestimonialList. */
export const Testimonial = ({
  quote,
  name,
  role,
  avatar,
  variant: ownVariant = "card",
  className,
  style,
  quoteClassName,
  quoteStyle,
  captionClassName,
  captionStyle,
  nameClassName,
  nameStyle,
  roleClassName,
  roleStyle,
}: TestimonialProps) => {
  const listVariant = useContext(TestimonialListContext);
  const variant = listVariant ?? ownVariant;
  const figure = (
    <figure className="testimonial__figure">
      {/* <q> adds the quotation marks of the document's language. */}
      <blockquote className={join("testimonial__quote", quoteClassName)} style={quoteStyle}><q>{quote}</q></blockquote>
      <figcaption className={join("testimonial__caption", captionClassName)} style={captionStyle}>
        {avatar}
        <span className="testimonial__author">
          <span className={join("testimonial__name", nameClassName)} style={nameStyle}>{name}</span>
          {role != null && <span className={join("testimonial__role", roleClassName)} style={roleStyle}>{role}</span>}
        </span>
      </figcaption>
    </figure>
  );
  const root = { className: join("testimonial", className), style, "data-variant-item": variant };
  if (variant === "card") return <Card as={listVariant ? "li" : "div"} {...root}>{figure}</Card>;
  return listVariant ? <li {...root}>{figure}</li> : <div {...root}>{figure}</div>;
};
