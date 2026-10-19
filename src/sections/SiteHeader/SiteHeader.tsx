import { Menu } from "lucide-react";
import { useId, type MouseEvent } from "react";
import { Container } from "../../components/Container/Container";
import "./SiteHeader.styles.css";
import type { SiteHeaderProps } from "./SiteHeader.types";
import { SITE_HEADER_LABELS } from "./SiteHeader.consts";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

// Following a link inside the open phone menu closes it; without JavaScript the page navigates anyway.
const closeMenu = (event: MouseEvent<HTMLElement>) => {
  const menu = event.currentTarget.closest<HTMLElement>("[popover]");
  if (menu?.matches(":popover-open")) menu.hidePopover();
};

/** The top bar of a public page: brand, navigation and actions, with a native phone menu. */
export const SiteHeader = ({
  brand,
  brandHref = "/",
  links = [],
  actions,
  variant = "plain",
  skipLinkTarget,
  labels,
  linkComponent: LinkComponent = "a",
  className,
  innerClassName,
  innerStyle,
  brandClassName,
  brandStyle,
  menuClassName,
  menuStyle,
  linkClassName,
  linkStyle,
  actionsClassName,
  actionsStyle,
  menuButtonClassName,
  menuButtonStyle,
  skipLinkClassName,
  skipLinkStyle,
  ...props
}: SiteHeaderProps) => {
  const text = { ...SITE_HEADER_LABELS, ...labels };
  const menuId = useId();
  const hasMenu = links.length > 0 || actions != null;
  return (
    <header {...props} className={join("site-header", className)} data-variant={variant}>
      {skipLinkTarget && (
        <a href={skipLinkTarget} className={join("site-header__skip", skipLinkClassName)} style={skipLinkStyle}>
          {text.skipLink}
        </a>
      )}
      <Container size="xl" className={join("site-header__inner", innerClassName)} style={innerStyle}>
        <LinkComponent href={brandHref} className={join("site-header__brand", brandClassName)} style={brandStyle}>
          {brand}
        </LinkComponent>
        {hasMenu && (
          <>
            {/* The Popover API opens the phone menu without JavaScript; from 768px it is an inline bar. */}
            <button
              type="button"
              popoverTarget={menuId}
              aria-label={text.menu}
              className={join("site-header__menu-button", menuButtonClassName)}
              style={menuButtonStyle}
            >
              <Menu aria-hidden size={22} />
            </button>
            <div id={menuId} popover="auto" className={join("site-header__menu", menuClassName)} style={menuStyle}>
              {links.length > 0 && (
                <nav aria-label={text.navigation} className="site-header__nav">
                  {links.map(({ label, href, active }) => (
                    <LinkComponent
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={join("site-header__link", linkClassName)}
                      style={linkStyle}
                      onClick={closeMenu}
                    >
                      {label}
                    </LinkComponent>
                  ))}
                </nav>
              )}
              {actions != null && (
                <div className={join("site-header__actions", actionsClassName)} style={actionsStyle}>{actions}</div>
              )}
            </div>
          </>
        )}
      </Container>
    </header>
  );
};
