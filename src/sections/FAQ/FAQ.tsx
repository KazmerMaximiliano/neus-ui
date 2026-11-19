import { Accordion } from "../../components/Accordion";
import type { FAQProps } from "./FAQ.types";
import "./FAQ.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** Questions and answers of a public page, each answer behind its question; works without JavaScript. */
export const FAQ = ({
  items,
  variant = "list",
  single = false,
  questionAs = "h3",
  className,
  itemClassName,
  itemStyle,
  questionClassName,
  questionStyle,
  answerClassName,
  answerStyle,
  ...props
}: FAQProps) => (
  <Accordion
    {...props}
    data-variant={variant}
    type={single ? "single" : "multiple"}
    items={items.map(({ question, answer }, index) => ({ value: String(index), title: question, content: answer }))}
    titleAs={questionAs}
    className={join("faq", className)}
    itemClassName={join("faq__item", itemClassName)}
    itemStyle={itemStyle}
    headerClassName={join("faq__question", questionClassName)}
    headerStyle={questionStyle}
    contentClassName={join("faq__answer", answerClassName)}
    contentStyle={answerStyle}
  />
);
