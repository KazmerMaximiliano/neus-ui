# Sidebar

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Responsive navigation with desktop panel, tablet rail and mobile dialog.

## Usage

```tsx
import { ThemeProvider, Sidebar } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Sidebar title="Workspace" items={[{ label: "Home", active: true }, { label: "Settings", onClick: () => window.alert("Settings") }]} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Desktop begins at 1024px. Tablet spans 768–1023px and uses a compact rail that expands on
pointer hover, focus or pinning. Below 768px a floating trigger opens a modal drawer with a
close control, Escape/backdrop dismissal, focus containment, focus restoration and scroll
locking. The dialog stays in the provider scope.

Items with visible false are omitted; active items expose aria-current page. An item with
`href` renders a link (Cmd/Ctrl+click and "open in new tab" work); `linkComponent` swaps
`<a>` for a router link. Items without `href` stay buttons. Mobile
selection closes navigation before calling the item callback. Missing icons use initials.
`children` replaces title/brand content. Labels can customize
navigation/open/close/expand/collapse accessible text. `sidebarStyle` targets the root.
`toggleStyle` covers both the mobile trigger and tablet expand button. Neus concave
decorations are transparent pseudo-elements; style them with tokens/CSS rather than props.

For an application shell, use [AppTemplate](../templates/AppTemplate.md): it joins the
sidebar's top block and the header in one band. Standalone, the top block is transparent and
shows whatever sits behind the sidebar.

## Props

See [the type source](../../src/components/Sidebar/Sidebar.types.ts) and
[implementation](../../src/components/Sidebar/Sidebar.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `closeIconClassName` | `string` | Omitted | Additional classes on `.sidebar__close-icon` |
| `closeIconStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__close-icon` |
| `toggleIconClassName` | `string` | Omitted | Additional classes for toggle icon |
| `toggleIconStyle` | `CSSProperties` | Omitted | Inline styles for toggle icon |
| `avatarClassName` | `string` | Omitted | Additional classes on `.sidebar__avatar` |
| `avatarStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__avatar` |
| `bodyClassName` | `string` | Omitted | Additional classes on `.sidebar__body` |
| `closeButtonClassName` | `string` | Omitted | Additional classes on `.sidebar__close` |
| `dialogClassName` | `string` | Omitted | Additional classes on `.sidebar__dialog` |
| `dialogStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__dialog` |
| `headerClassName` | `string` | Omitted | Additional classes on `.sidebar__header` |
| `headerInnerClassName` | `string` | Omitted | Additional classes on `.sidebar__header-inner` |
| `headerInnerStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__header-inner` |
| `iconClassName` | `string` | Omitted | Additional classes on `.sidebar__button-icon`, `.sidebar__button-icon.sidebar__button-initial` |
| `itemClassName` | `string` | Omitted | Additional classes on `.sidebar__button` |
| `labelClassName` | `string` | Omitted | Additional classes on `.sidebar__button-label` |
| `panelClassName` | `string` | Omitted | Additional classes on `.sidebar__panel` |
| `panelStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__panel` |
| `titleClassName` | `string` | Omitted | Additional classes on `.sidebar__title` |
| `toggleClassName` | `string` | Omitted | Additional classes on `.sidebar__expand.sidebar__avatar`, `.sidebar__toggle` |
| `items` | `SidebarItem[]` | Required | Navigation items with optional icons, `href` (renders a link), `onClick`, active and visible flags |
| `linkComponent` | `ElementType` | `"a"` | Router link rendered for items with `href` instead of `<a>` |
| `title` | `string` | Omitted | App name: full title on desktop, avatar initial in narrow layouts |
| `children` | `ReactNode` | Omitted | Custom non-interactive branding in the header/avatar; replaces the default title or initial |
| `className` | `string` | Omitted | Additional classes on `.sidebar` |
| `labels` | `SidebarLabels` | Omitted | Accessible names for navigation, open, close, expand and collapse |
| `sidebarStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar` |
| `headerStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__header` |
| `titleStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__title` |
| `bodyStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__body` |
| `itemStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__button` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__button-icon`, `.sidebar__button-icon.sidebar__button-initial` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__button-label` |
| `toggleStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__expand.sidebar__avatar`, `.sidebar__toggle` |
| `closeButtonStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar__close` |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Sidebar/index.ts). A type shown here is not necessarily a
package export.

```ts
type SidebarItem = {
  label: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};

type SidebarLabels = {
  navigation?: string;
  open?: string;
  close?: string;
  expand?: string;
  collapse?: string;
};

type SidebarViewport = "mobile" | "tablet" | "desktop";

type SidebarScrollLock = { count: number; hadClass: boolean };
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.sidebar__title` | `span` | `titleClassName` | `titleStyle` | `Always` |
| `.sidebar__panel` | `div` | `panelClassName` | `panelStyle` | `Always` |
| `.sidebar__header` | `div` | `headerClassName` | `headerStyle` | `Always` |
| `.sidebar__header-inner` | `div` | `headerInnerClassName` | `headerInnerStyle` | `Always` |
| `.sidebar__avatar` | `div` | `avatarClassName` | `avatarStyle` | `isMobile` |
| `.sidebar__close` | `button` | `closeButtonClassName` | `closeButtonStyle` | `isMobile` |
| `.sidebar__close-icon` | `X` | `closeIconClassName` | `closeIconStyle` | `isMobile` |
| `.sidebar__expand .sidebar__avatar` | `button` | `toggleClassName` | `toggleStyle` | `isTablet` |
| `.sidebar__body` | `nav` | `bodyClassName` | `bodyStyle` | `Always` |
| `.sidebar__button` | `button`, or `a` / `linkComponent` with `item.href` | `itemClassName` | `itemStyle` | `item.visible !== false` |
| `.sidebar__button-icon` | `item.icon` | `iconClassName` | `iconStyle` | `item.icon` |
| `.sidebar__button-icon .sidebar__button-initial` | `span` | `iconClassName` | `iconStyle` | `item.visible !== false` |
| `.sidebar__button-label` | `span` | `labelClassName` | `labelStyle` | `item.visible !== false` |
| `.sidebar` | `div` | `className` | `sidebarStyle` | `Always` |
| `.sidebar__toggle` | `button` | `toggleClassName` | `toggleStyle` | `isMobile` |
| `.sidebar__dialog` | `dialog` | `dialogClassName` | `dialogStyle` | `isMobile` |

State/variant selectors: `.sidebar__button--active`.

Use the [stylesheet](../../src/components/Sidebar/Sidebar.styles.css) for pseudo-elements
and state selectors. For shared field/listbox parts, also inspect the shared styles linked
from the implementation. Consumer content and third-party generated internals retain their
own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Sidebar titleClassName="example-sidebar" titleStyle={{ outlineOffset: 4 }} title="Workspace" items={[{ label: "Home", active: true }, { label: "Settings", onClick: () => window.alert("Settings") }]} />
```

```css
.example-sidebar {
  outline-offset: 4px;
}
.example-sidebar:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus, disabled states and pseudo-elements. Custom properties still
follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [sidebar baseline recipe](../../src/design-systems/neus/generated/recipes/sidebar.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--sidebar-avatar-radius` | sidebar avatar radius | `50%` |
| `--sidebar-body-gap` | sidebar body gap | `16px` |
| `--sidebar-body-padding` | sidebar body padding | `24px 16px` |
| `--sidebar-body-padding-bottom` | sidebar body padding bottom | `24px` |
| `--sidebar-body-padding-left` | sidebar body padding left | `16px` |
| `--sidebar-compact-width` | sidebar compact width | `100px` |
| `--sidebar-concave-radius` | sidebar concave radius | `32px` |
| `--sidebar-control-icon-size` | sidebar control icon size | `20px` |
| `--sidebar-control-radius` | sidebar control radius | `50%` |
| `--sidebar-control-size` | sidebar control size | `44px` |
| `--sidebar-convex-radius` | sidebar convex radius | `32px` |
| `--sidebar-decoration-display` | sidebar decoration display | `block` |
| `--sidebar-floating-offset` | sidebar floating offset | `16px` |
| `--sidebar-header-gap` | sidebar header gap | `8px` |
| `--sidebar-header-height` | sidebar header height | `10dvh` |
| `--sidebar-header-min-height` | sidebar header min height | `80px` |
| `--sidebar-header-padding` | sidebar header padding | `16px` |
| `--sidebar-icon-size` | sidebar icon size | `16px` |
| `--sidebar-item-gap` | sidebar item gap | `12px` |
| `--sidebar-item-min-height` | sidebar item min height | `44px` |
| `--sidebar-item-padding` | sidebar item padding | `16px 24px` |
| `--sidebar-item-radius` | sidebar item radius | `3em` |
| `--sidebar-item-size` | sidebar item size | `11px` |
| `--sidebar-item-spacing` | sidebar item spacing | `0.25em` |
| `--sidebar-item-transform` | sidebar item transform | `uppercase` |
| `--sidebar-mobile-width` | sidebar mobile width | `320px` |
| `--sidebar-radius` | sidebar radius | `0px` |
| `--sidebar-title-size` | sidebar title size | `16px` |
| `--sidebar-title-spacing` | sidebar title spacing | `0px` |
| `--sidebar-transition` | sidebar transition | `0.2s ease` |
| `--sidebar-width` | sidebar width | `250px` |
| `--sidebar-z-index` | sidebar z index | `1000` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--sidebar-backdrop-background` | sidebar backdrop background | `var(--color-overlay)` |
| `--sidebar-background` | sidebar background | `var(--color-primary)` |
| `--sidebar-border-color` | sidebar border color | `var(--color-border-subtle)` |
| `--sidebar-border-width` | sidebar border width | `0px` |
| `--sidebar-color` | sidebar color | `var(--color-text-on-primary)` |
| `--sidebar-control-background` | sidebar control background | `var(--color-primary)` |
| `--sidebar-control-border-color` | sidebar control border color | `var(--color-border-subtle)` |
| `--sidebar-control-border-width` | sidebar control border width | `0px` |
| `--sidebar-control-color` | sidebar control color | `var(--color-text-on-primary)` |
| `--sidebar-control-shadow` | sidebar control shadow | `0 2px 8px var(--color-shadow)` |
| `--sidebar-header-background` | sidebar header background | `transparent` |
| `--sidebar-header-border-width` | sidebar header border width | `0px` |
| `--sidebar-item-background` | sidebar item background | `transparent` |
| `--sidebar-item-border-color` | sidebar item border color | `transparent` |
| `--sidebar-item-border-width` | sidebar item border width | `0px` |
| `--sidebar-item-color` | sidebar item color | `color-mix( in srgb, var(--sidebar-color) 80%, transparent )` |
| `--sidebar-shadow` | sidebar shadow | `none` |
| `--sidebar-title-color` | sidebar title color | `var(--color-primary)` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--sidebar-control-focus-color` | sidebar control focus color | `var(--color-focus)` |
| `--sidebar-control-focus-offset` | sidebar control focus offset | `3px` |
| `--sidebar-control-hover-background` | sidebar control hover background | `var(--color-primary-dark)` |
| `--sidebar-focus-offset` | sidebar focus offset | `2px` |
| `--sidebar-focus-width` | sidebar focus width | `2px` |
| `--sidebar-item-active-background` | sidebar item active background | `color-mix( in srgb, var(--sidebar-color) 25%, transparent )` |
| `--sidebar-item-active-color` | sidebar item active color | `var(--sidebar-color)` |
| `--sidebar-item-focus-color` | sidebar item focus color | `var(--sidebar-color)` |
| `--sidebar-item-hover-background` | sidebar item hover background | `color-mix( in srgb, var(--sidebar-color) 15%, transparent )` |
| `--sidebar-item-hover-color` | sidebar item hover color | `var(--sidebar-color)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--sidebar-font-family` | sidebar font family | `var(--font-body)` |
| `--sidebar-item-line-height` | sidebar item line height | `normal` |
| `--sidebar-item-weight` | sidebar item weight | `700` |
| `--sidebar-title-line-height` | sidebar title line height | `1.3` |
| `--sidebar-title-weight` | sidebar title weight | `700` |

### Shared dependencies and runtime values

`--sidebar-current-width`.

Semantic/foundation tokens are described in [the shared token
reference](../design/tokens.md). Component dependencies belong to their own linked recipe.
Position, size, category and progress variables set by the implementation are runtime
values, not provider configuration fields.

### Scoped recipe override

Wrap the usage example in a local provider with a class:

```tsx
<ThemeProvider scope="local" designSystem="vercel" className="example-scope">
  {/* Place the component usage here. */}
</ThemeProvider>
```

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --sidebar-avatar-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Sidebar story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
