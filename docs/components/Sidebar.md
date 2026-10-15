# Sidebar

[Component catalog](../components.md) · [Design systems](../design-systems.md)

Sidebar owns navigation structure and responsive interaction. Its six CSS recipes
select appearance through ThemeProvider; the application owns which item is active
and what each action does.

```tsx
import { Sidebar, ThemeProvider, type SidebarItem } from "neus-ui";
import "neus-ui/dist/neus-ui.css";
import { House } from "lucide-react";

const items: SidebarItem[] = [
  { label: "Inicio", icon: House, active: true, onClick: () => navigate("/") },
  { label: "Configuración", onClick: () => navigate("/settings") },
];

export const Navigation = () => (
  <ThemeProvider designSystem="neus" colorScheme="light">
    <Sidebar title="Mi aplicación" items={items} />
  </ThemeProvider>
);
```

`navigate` is supplied by your application or router. Sidebar does not import a
router or change `active` after an action. Actions are native `type="button"`
buttons; they do not submit surrounding forms. Items without icons display an
initial, and `visible: false` omits an item altogether.

## Props and customization

| Prop | Type / destination | Default |
| --- | --- | --- |
| `items` | Required `SidebarItem[]`: `label`, optional Lucide `icon`, `onClick`, `active`, `visible` | — |
| `title` | App name: full title on desktop, avatar initial on tablet/mobile | Absent |
| `children` | Optional non-interactive header content replacing the default title/initial | Absent |
| `className` | Additional classes on `.sidebar` | Absent |
| `labels` | Optional `SidebarLabels` with `navigation`, `open`, `close`, `expand`, `collapse` | Spanish labels below |
| `sidebarStyle` | `CSSProperties` on the fixed root | `undefined` |
| `headerStyle` | Header containing title and controls | `undefined` |
| `titleStyle` | Brand content wrapper (title, initial or children) | `undefined` |
| `bodyStyle` | Scrollable `nav` | `undefined` |
| `itemStyle` | Every navigation button | `undefined` |
| `iconStyle` | Every Lucide icon or fallback initial | `undefined` |
| `labelStyle` | Every option label | `undefined` |
| `toggleStyle` | Mobile opener or tablet expansion button | `undefined` |
| `closeButtonStyle` | Mobile close button | `undefined` |

Default labels are `Navegación principal`, `Abrir menú`, `Cerrar menú`,
`Expandir navegación`, and `Contraer navegación`. Partial overrides retain the
other defaults. Exported public types are `SidebarProps`, `SidebarItem` and
`SidebarLabels`; Storybook-only types remain internal.

```tsx
<Sidebar
  title="Workspace"
  items={items}
  className="workspace-sidebar"
  labels={{ navigation: "Workspace routes", open: "Open navigation", close: "Close navigation" }}
  itemStyle={{ minHeight: 48 }}
  labelStyle={{ letterSpacing: "0.02em" }}
/>
```

Use CSS tokens for coordinated geometry and colors. Per-part objects apply only
to their documented element; omitting them again restores CSS defaults. A
`bodyStyle.background` changes only the body, so use `--sidebar-background` to
change both the body and its concave decoration.

```css
.workspace-sidebar {
  --sidebar-background: #056249;
  --sidebar-color: #fff;
  --sidebar-concave-radius: 40px;
  --sidebar-convex-radius: 40px;
}
```

NEUS's header is transparent. Its lower-left concave wedge is a masked
pseudoelement painted with `--sidebar-background`, joining the body's convex
upper-right corner. Transparent areas reveal the actual page: solid colors,
gradients and images work without an additional background-color prop. The
content and focus outlines are never masked.

Custom branding uses `children`, CSS classes and the existing style overrides;
there are no dedicated logo or image props. Children replace the default content
in all layouts, inside the avatar on tablet and mobile and in the title area on
desktop. Keep this content non-interactive because the tablet avatar is itself a
button. For example, the application can supply its own image:

```tsx
<Sidebar title="Workspace" items={items}>
  <img className="app-brand-image" src="/brand.svg" alt="Workspace" />
</Sidebar>
```

```css
.app-brand-image {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 44px;
  object-fit: contain;
}
```

`titleStyle` targets the content wrapper and `toggleStyle` targets the tablet
avatar button. `--sidebar-avatar-radius` controls the avatar shape independently
of the hamburger and close controls. The mobile opener remains a hamburger;
the opened drawer shows the brand avatar and its separate close button. The
floating opener is hidden while the drawer is open, so it cannot show through
the transparent NEUS header; closing restores its visibility and focus.

## Token contract

The complete defaults live in `src/design-systems/neus/sidebar.css`. They reset
at `:root` and every `[data-design-system]`. All other recipes override variables
only. Apple uses soft corners, Carbon square options and separators, Material
rounded selection and elevation, Neobrutalism strong borders and hard shadows,
and Vercel neutral surfaces and subtle borders. These five recipes disable the
concave decoration; they remain project adaptations rather than complete copies
of external libraries.

| Group | Tokens (`--sidebar-` prefix) |
| --- | --- |
| Surface and layout | `background`, `color`, `font-family`, `width`, `compact-width`, `mobile-width`, `z-index`, `border-width`, `border-color`, `radius`, `shadow`, `transition` |
| Header and curves | `header-height`, `header-min-height`, `header-padding`, `header-gap`, `header-background`, `header-border-width`, `decoration-display`, `concave-radius`, `convex-radius` |
| Title | `title-color`, `title-size`, `title-weight`, `title-line-height`, `title-spacing` |
| Navigation | `body-padding`, `body-gap`, `body-padding-bottom`, `body-padding-left` |
| Items | `item-padding`, `item-gap`, `item-min-height`, `item-radius`, `item-border-width`, `item-border-color`, `item-background`, `item-color`, `item-size`, `item-weight`, `item-line-height`, `item-spacing`, `item-transform`, `icon-size` |
| States | `item-hover-background`, `item-hover-color`, `item-active-background`, `item-active-color`, `item-focus-color`, `focus-width`, `focus-offset`, `control-focus-offset` |
| Controls | `control-size`, `avatar-radius`, `control-icon-size`, `control-radius`, `control-background`, `control-color`, `control-border-width`, `control-border-color`, `control-shadow`, `control-hover-background`, `control-focus-color`, `floating-offset`, `backdrop-background` |

Set `--sidebar-decoration-display: none` to remove the concave wedge and
`--sidebar-convex-radius: 0px` to remove the body's convex corner. Set
`--sidebar-header-background: var(--sidebar-background)` for a continuous
rectangular panel. The geometric `--sidebar-current-width` variable is derived
internally from the viewport and expansion state.

## Responsive behavior and accessibility

| Viewport | Behavior |
| --- | --- |
| `<768px` | Floating hamburger at the upper left; menu initially closed |
| `768–1023px` | 100px compact rail, expanding to 250px |
| `≥1024px` | 250px full sidebar |

The boundaries are fixed; width tokens customize dimensions. On tablet,
hover-capable devices expand on hover, keyboard focus expands while inside, and
the avatar button pins expansion for touch. The avatar contains the first letter
of `title`, without a separate letter or arrow; its accessible action name and
`aria-expanded` still expose the expansion behavior. Unpinning returns to the rail once
focus and hover leave it. Option buttons always retain their label as an accessible name. Without a title,
the avatar uses the navigation label's first letter.

The mobile drawer is up to 320px wide, limited to the available viewport. It uses
`100dvh`, safe-area insets, and a scrollable body. Native `<dialog>.showModal()`
keeps it in the theme's DOM scope and places it in the browser's top layer.
Outside content is inert while open. Initial focus goes to the close button;
Escape, the close button, a backdrop click, or selecting an item closes it and
returns focus to the opener. A drag starting inside the drawer does not dismiss
it when released over the backdrop.

Scroll locking uses a temporary root class, preserving existing inline scroll
styles. Closing, unmounting or leaving mobile releases the lock. Returning to
mobile starts closed; leaving tablet resets pinned expansion. Motion is disabled
when the user prefers reduced motion. Each instance has unique control IDs.

## AppTemplate and migration

AppTemplate already supplies Sidebar and reserves space using its width tokens.
Its `routes`, `menu` and `children` API is preserved. It delegates mobile opening,
overlay and closing to Sidebar and follows tablet hover/focus/pinned expansion.

For standalone Sidebar use, reserve page space yourself: zero on mobile,
`--sidebar-compact-width` on tablet, and `--sidebar-width` on desktop. When using
AppTemplate, put width overrides on its enclosing theme scope so both components
inherit the same values.

Existing `title`, `items`, callbacks and `.sidebar__*` classes remain available.
Navigation items now render as buttons, so application selectors targeting `div`
must be updated. Remove external mobile hamburgers, overlays and display toggles:
Sidebar now owns those behaviors. Opening and expansion are internal states.

Storybook provides one fullscreen story with local design selection, per-part
controls and solid/gradient/image backgrounds. The toolbar selects light/dark;
resize the viewport to explore the responsive modes.
