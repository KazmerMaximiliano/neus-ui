# AppTemplate

[Template index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Application shell composing Sidebar, header and main content.

## Usage

```tsx
import { ThemeProvider, Link, AppTemplate } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <AppTemplate title="Workspace" routes={[{ label: "Home", active: true }]} menu={<Link href="/account" label="Account" />}><h1>Dashboard</h1></AppTemplate>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Sidebar owns responsive navigation; the shell adjusts content/header offsets for desktop,
tablet expansion and mobile. Header menu and main children are consumer content. The title
defaults to VITE_APP_NAME or NEUS UI. `sidebarStyle` and sidebarClassName target the
composed public Sidebar root; sidebarContainerStyle/sidebarContainerClassName target the
shell-owned sidebar container. Other Sidebar internals use its CSS classes and tokens.

## Props

See [the type source](../../src/templates/AppTemplate/AppTemplate.types.ts) and
[implementation](../../src/templates/AppTemplate/AppTemplate.tsx) for the exact contract.
All customization props are optional and default to undefined unless noted; section style
props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `sidebarClassName` | `string` | Omitted | Additional classes on `.sidebar` |
| `contentClassName` | `string` | Omitted | Additional classes on `.app-template__content` |
| `contentContainerClassName` | `string` | Omitted | Additional classes on `.app-template__content-container` |
| `headerClassName` | `string` | Omitted | Additional classes on `.app-template__header` |
| `sidebarContainerClassName` | `string` | Omitted | Additional classes on `.app-template__sidebar` |
| `sidebarContainerStyle` | `CSSProperties` | Omitted | Inline styles on `.app-template__sidebar` |
| `children` | `ReactNode` | Required | Content to display in the main area |
| `routes` | `SidebarItem[]` | Required | Sidebar navigation items |
| `menu` | `ReactNode` | Omitted | Optional menu component for the header |
| `title` | `string` | `APP_NAME` | title override |
| `className` | `string` | Omitted | Additional classes on `.app-template` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.app-template` |
| `headerStyle` | `CSSProperties` | Omitted | Inline styles on `.app-template__header` |
| `sidebarStyle` | `CSSProperties` | Omitted | Inline styles on `.sidebar` |
| `contentStyle` | `CSSProperties` | Omitted | Inline styles on `.app-template__content` |
| `contentContainerStyle` | `CSSProperties` | Omitted | Inline styles on `.app-template__content-container` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.app-template` | `div` | `className` | `style` | `Always` |
| `.app-template__header` | `header` | `headerClassName` | `headerStyle` | `Always` |
| `.app-template__sidebar` | `div` | `sidebarContainerClassName` | `sidebarContainerStyle` | `Always` |
| `.app-template__content` | `main` | `contentClassName` | `contentStyle` | `Always` |
| `.app-template__content-container` | `div` | `contentContainerClassName` | `contentContainerStyle` | `Always` |
| `.sidebar` | `Sidebar root` | `sidebarClassName` | `sidebarStyle` | `Always; composed public child` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/templates/AppTemplate/AppTemplate.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<AppTemplate headerClassName="example-app-template" headerStyle={{ outlineOffset: 4 }} title="Workspace" routes={[{ label: "Home", active: true }]} menu={<Link href="/account" label="Account" />}><h1>Dashboard</h1></AppTemplate>
```

```css
.example-app-template {
  outline-offset: 4px;
}
.example-app-template:focus-visible {
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

- [templates baseline recipe](../../src/design-systems/neus/generated/recipes/templates.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--app-template-background` | app template background | `var(--color-surface)` |
| `--app-template-color` | app template color | `var(--color-text-primary)` |
| `--app-template-header-background` | app template header background | `var(--color-surface)` |
| `--app-template-header-border-width` | app template header border width | `0px` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--app-template-content-padding` | app template content padding | `24px` |
| `--app-template-header-height` | app template header height | `80px` |
| `--app-template-header-padding` | app template header padding | `16px` |
| `--app-template-max-width` | app template max width | `1200px` |

### Shared dependencies and runtime values

`--app-template-sidebar-width`, `--color-border-subtle`, `--font-body`,
`--sidebar-compact-width`, `--sidebar-control-size`, `--sidebar-floating-offset`,
`--sidebar-transition`, `--sidebar-width`, `--sidebar-z-index`.

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
  --app-template-content-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Sidebar](../components/Sidebar.md).

The single AppTemplate story exposes props as controls. Its local design selector defaults
to Inherit global, supports all six systems, and follows the toolbar color scheme.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
