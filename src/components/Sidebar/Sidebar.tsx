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
  title,
  items,
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
    <span className="sidebar__title" style={titleStyle}>
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
    <div className="sidebar__panel">
      <div className="sidebar__header" style={headerStyle}>
        <div className="sidebar__header-inner">
          {!isTablet &&
            brand != null &&
            brand !== false &&
            (isMobile ? (
              <div className="sidebar__avatar">{brandContent}</div>
            ) : (
              brandContent
            ))}
          {isMobile && (
            <button
              ref={closeRef}
              type="button"
              className="sidebar__close"
              aria-label={labels?.close ?? "Cerrar menú"}
              style={closeButtonStyle}
              onClick={closeMenu}
            >
              <X aria-hidden="true" />
            </button>
          )}
          {isTablet && (
            <button
              type="button"
              className="sidebar__expand sidebar__avatar"
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
        className="sidebar__body"
        aria-label={navigationLabel}
        style={bodyStyle}
      >
        {items.map(
          (item, index) =>
            item.visible !== false && (
              <button
                key={index}
                type="button"
                aria-label={item.label}
                aria-current={item.active ? "page" : undefined}
                className={`sidebar__button${item.active ? " sidebar__button--active" : ""}`}
                style={itemStyle}
                onClick={() => {
                  if (isMobile) closeMenu();
                  item.onClick?.();
                }}
              >
                {item.icon ? (
                  <item.icon
                    className="sidebar__button-icon"
                    aria-hidden="true"
                    style={iconStyle}
                  />
                ) : (
                  <span
                    className="sidebar__button-icon sidebar__button-initial"
                    aria-hidden="true"
                    style={iconStyle}
                  >
                    {item.label.charAt(0)}
                  </span>
                )}
                <span className="sidebar__button-label" style={labelStyle}>
                  {item.label}
                </span>
              </button>
            ),
        )}
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
            className="sidebar__toggle"
            aria-label={labels?.open ?? "Abrir menú"}
            aria-expanded={open}
            aria-controls={dialogId}
            style={toggleStyle}
            onClick={() => setState((current) => ({ ...current, open: true }))}
          >
            <Menu aria-hidden="true" />
          </button>
          <dialog
            ref={dialogRef}
            id={dialogId}
            className="sidebar__dialog"
            aria-label={navigationLabel}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const buttons = Array.from(
                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                  "button",
                ),
              ).filter(
                (button) =>
                  !button.disabled && button.getClientRects().length > 0,
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
