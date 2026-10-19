import { useId } from "react";
import { Container } from "../../components/Container/Container";
import "./SiteFooter.styles.css";
import type { SiteFooterProps } from "./SiteFooter.types";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** The end of a public page: brand, columns of links and the legal line. */
export const SiteFooter = ({
  brand,
  columns = [],
  legal,
  linkComponent: LinkComponent = "a",
  className,
  innerClassName,
  innerStyle,
  brandClassName,
  brandStyle,
  columnClassName,
  columnStyle,
  columnTitleClassName,
  columnTitleStyle,
  linkClassName,
  linkStyle,
  legalClassName,
  legalStyle,
  ...props
}: SiteFooterProps) => {
  const id = useId();
  return (
    <footer {...props} className={join("site-footer", className)} data-columns={columns.length > 0 || undefined}>
      <Container size="xl" className={join("site-footer__inner", innerClassName)} style={innerStyle}>
        {(brand != null || columns.length > 0) && (
          <div className="site-footer__top">
            {brand != null && <div className={join("site-footer__brand", brandClassName)} style={brandStyle}>{brand}</div>}
            {columns.map(({ title, links }, index) => (
              <nav key={title} aria-labelledby={`${id}-${index}`} className={join("site-footer__column", columnClassName)} style={columnStyle}>
                <p id={`${id}-${index}`} className={join("site-footer__column-title", columnTitleClassName)} style={columnTitleStyle}>{title}</p>
                <ul className="site-footer__links">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <LinkComponent href={href} className={join("site-footer__link", linkClassName)} style={linkStyle}>{label}</LinkComponent>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        )}
        {legal != null && <div className={join("site-footer__legal", legalClassName)} style={legalStyle}>{legal}</div>}
      </Container>
    </footer>
  );
};
