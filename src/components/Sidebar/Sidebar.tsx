import { Menu, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import "./Sidebar.styles.css";
import type { SidebarProps, SidebarState } from "./Sidebar.types";
import {
  getSidebarServerViewport,
  getSidebarViewport,
  isOutsideSidebarDialog,
  lockSidebarScroll,
  subscribeSidebarViewport,
} from "./Sidebar.utils";

export const Sidebar = ({
  closeIconClassName,
  closeIconStyle,
  toggleIconClassName,
  toggleIconStyle,
  avatarClassName,
  avatarStyle,
  bodyClassName,
  closeButtonClassName,
  dialogClassName,
  dialogStyle,
  headerClassName,
  headerInnerClassName,
  headerInnerStyle,
  iconClassName,
  itemClassName,
  labelClassName,
  panelClassName,
  panelStyle,
  titleClassName,
  toggleClassName,
  title,
  items,
  linkComponent = "a",
  children,
  className,
  labels,
  sidebarStyle,
  headerStyle,
  titleStyle,
  bodyStyle,
  itemStyle,
  iconStyle,
  labelStyle,
  toggleStyle,
  closeButtonStyle,
}: SidebarProps) => {
  const viewport = useSyncExternalStore(
    subscribeSidebarViewport,
    getSidebarViewport,
    getSidebarServerViewport,
  );

  const [state, setState] = useState<SidebarState>({
    viewport,
    open: false,
    pinned: false,
    hovered: false,
    focused: false,
  });

  if (state.viewport !== viewport) {
    setState({
      viewport,
      open: false,
      pinned: false,
      hovered: false,
      focused: false,
    });
  }

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const open = state.viewport === viewport && state.open;
  const pinned = state.viewport === viewport && state.pinned;
  const expanded = isTablet && (pinned || state.hovered || state.focused);
  const id = useId();
  const dialogId = `${id}-dialog`;
  const navigationId = `${id}-navigation`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartedOutside = useRef(false);
  const navigationLabel = labels?.navigation ?? "Navegación principal";

  const brand =
    children ??
    (isTablet || isMobile ? (title || navigationLabel).charAt(0) : title);
  const brandContent = (
    <span
      className={["sidebar__title", titleClassName].filter(Boolean).join(" ")}
      style={titleStyle}
    >
      {brand}
    </span>
  );

  const closeMenu = () => setState((current) => ({ ...current, open: false }));

  useEffect(() => {
    const dialog = dialogRef.current;
    const toggle = toggleRef.current;
    if (!isMobile || !open || !dialog) return;
    dialog.showModal();
    closeRef.current?.focus();
    const unlockScroll = lockSidebarScroll(dialog.ownerDocument);
    return () => {
      if (dialog.open) dialog.close();
      unlockScroll();
      if (toggle?.isConnected && getSidebarViewport() === "mobile")
        toggle.focus();
    };
  }, [isMobile, open]);

  const panel = (
    <div
      className={["sidebar__panel", panelClassName].filter(Boolean).join(" ")}
      style={panelStyle}
    >
      <div
        className={["sidebar__header", headerClassName]
          .filter(Boolean)
          .join(" ")}
        style={headerStyle}
      >
        <div
          className={["sidebar__header-inner", headerInnerClassName]
            .filter(Boolean)
            .join(" ")}
          style={headerInnerStyle}
        >
          {!isTablet &&
            brand != null &&
            brand !== false &&
            (isMobile ? (
              <div
                className={["sidebar__avatar", avatarClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={avatarStyle}
              >
                {brandContent}
              </div>
            ) : (
              brandContent
            ))}
          {isMobile && (
            <button
              ref={closeRef}
              type="button"
              className={["sidebar__close", closeButtonClassName]
                .filter(Boolean)
                .join(" ")}
              aria-label={labels?.close ?? "Cerrar menú"}
              style={closeButtonStyle}
              onClick={closeMenu}
            >
              <X
                aria-hidden="true"
                className={["sidebar__close-icon", closeIconClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={closeIconStyle}
              />
            </button>
          )}
          {isTablet && (
            <button
              type="button"
              className={["sidebar__expand sidebar__avatar", toggleClassName]
                .filter(Boolean)
                .join(" ")}
              aria-label={
                pinned
                  ? (labels?.collapse ?? "Contraer navegación")
                  : (labels?.expand ?? "Expandir navegación")
              }
              aria-expanded={expanded}
              aria-controls={navigationId}
              style={toggleStyle}
              onClick={() =>
                setState((current) => ({ ...current, pinned: !current.pinned }))
              }
            >
              {brandContent}
            </button>
          )}
        </div>
      </div>
      <nav
        id={navigationId}
        className={["sidebar__body", bodyClassName].filter(Boolean).join(" ")}
        aria-label={navigationLabel}
        style={bodyStyle}
      >
        {items.map((item, index) => {
          if (item.visible === false) return null;
          const Item = item.href === undefined ? "button" : linkComponent;
          return (
            <Item
              key={index}
              {...(item.href === undefined
                ? { type: "button" }
                : { href: item.href })}
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              className={[
                `sidebar__button${item.active ? " sidebar__button--active" : ""}`,
                itemClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              style={itemStyle}
              onClick={() => {
                if (isMobile) closeMenu();
                item.onClick?.();
              }}
            >
              {item.icon ? (
                <item.icon
                  className={["sidebar__button-icon", iconClassName]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                  style={iconStyle}
                />
              ) : (
                <span
                  className={[
                    "sidebar__button-icon sidebar__button-initial",
                    iconClassName,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                  style={iconStyle}
                >
                  {item.label.charAt(0)}
                </span>
              )}
              <span
                className={["sidebar__button-label", labelClassName]
                  .filter(Boolean)
                  .join(" ")}
                style={labelStyle}
              >
                {item.label}
              </span>
            </Item>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div
      className={["sidebar", className].filter(Boolean).join(" ")}
      data-viewport={viewport}
      data-expanded={expanded}
      style={sidebarStyle}
      onPointerEnter={(event) => {
        if (
          isTablet &&
          event.pointerType === "mouse" &&
          window.matchMedia("(hover: hover)").matches
        ) {
          setState((current) => ({ ...current, hovered: true }));
        }
      }}
      onPointerLeave={() => {
        if (isTablet) setState((current) => ({ ...current, hovered: false }));
      }}
      onFocus={() => {
        if (isTablet) setState((current) => ({ ...current, focused: true }));
      }}
      onBlur={(event) => {
        if (isTablet && !event.currentTarget.contains(event.relatedTarget)) {
          setState((current) => ({ ...current, focused: false }));
        }
      }}
    >
      {isMobile ? (
        <>
          <button
            ref={toggleRef}
            type="button"
            className={["sidebar__toggle", toggleClassName]
              .filter(Boolean)
              .join(" ")}
            aria-label={labels?.open ?? "Abrir menú"}
            aria-expanded={open}
            aria-controls={dialogId}
            style={toggleStyle}
            onClick={() => setState((current) => ({ ...current, open: true }))}
          >
            <Menu
              aria-hidden="true"
              className={["sidebar__toggle-icon", toggleIconClassName]
                .filter(Boolean)
                .join(" ")}
              style={toggleIconStyle}
            />
          </button>
          <dialog
            ref={dialogRef}
            id={dialogId}
            className={["sidebar__dialog", dialogClassName]
              .filter(Boolean)
              .join(" ")}
            style={dialogStyle}
            aria-label={navigationLabel}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const buttons = Array.from(
                event.currentTarget.querySelectorAll<HTMLElement>(
                  "button, a[href]",
                ),
              ).filter(
                (button) =>
                  !button.matches(":disabled") &&
                  button.getClientRects().length > 0,
              );
              const first = buttons[0];
              const last = buttons[buttons.length - 1];
              if (
                event.shiftKey &&
                event.currentTarget.ownerDocument.activeElement === first
              ) {
                event.preventDefault();
                last?.focus();
              } else if (
                !event.shiftKey &&
                event.currentTarget.ownerDocument.activeElement === last
              ) {
                event.preventDefault();
                first?.focus();
              }
            }}
            onCancel={(event) => {
              event.preventDefault();
              closeMenu();
            }}
            onClose={(event) => {
              if (!event.currentTarget.open) closeMenu();
            }}
            onPointerDown={(event) => {
              pointerStartedOutside.current =
                event.target === event.currentTarget &&
                isOutsideSidebarDialog(
                  event.currentTarget,
                  event.clientX,
                  event.clientY,
                );
            }}
            onClick={(event) => {
              if (
                pointerStartedOutside.current &&
                event.target === event.currentTarget &&
                isOutsideSidebarDialog(
                  event.currentTarget,
                  event.clientX,
                  event.clientY,
                )
              )
                closeMenu();
              pointerStartedOutside.current = false;
            }}
          >
            {panel}
          </dialog>
        </>
      ) : (
        panel
      )}
    </div>
  );
};
