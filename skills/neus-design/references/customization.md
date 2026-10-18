# Customization ladder

Pick the lowest level that expresses the change. Each level up costs more
maintenance and is easier to get wrong. Confirm every prop, part and token
name in the component's guide (`npx neus docs <Name>`) before using it.

| Level | Use it for | Where it lives |
| --- | --- | --- |
| 0. Props and variants | Hierarchy and intent: primary vs secondary action, outlined card, small field | The component's props |
| 1. Global action palette | Brand primary, success, error and info colors | `npx neus init`, which rewrites `neus.config.json` and the generated theme file |
| 2. Reusable tokens | Radius, padding, typography or surfaces for the whole app or a feature | `<styles>/neus.overrides.css` |
| 3. Part classes + CSS | Hover, focus, disabled, pseudo-elements, layout of one part | `*ClassName` props + a project stylesheet |
| 4. Part styles | One static property on one rendered part | `*Style` props |

## Level 0: props and variants

Exhaust these first. Examples: Button `variant` (`solid`, `secondary`,
`tonal`, `elevated`, `outlined`, `text`), `color` (`primary`, `success`,
`error`, `info`, `white`), `size` and `href` (a link with the button's
look; `linkComponent` takes the router's link); Card `variant` (`auto`, `filled`,
`outlined`, `elevated`) and `as` (`div`, `article`, `li`, `figure`,
`section`); Input and picker fields `variant`, `size`,
`labelPlacement` and `description` (help text wired to
`aria-describedby`), plus native attributes such as `autoComplete`,
`inputMode` and `spellCheck` on Input; Sidebar and AppTemplate routes
`href` with `linkComponent`; Badge `variant` and `color`; Heading `as` and
`size`; Text `variant`, `tone`, `weight`, `measure`, `lines` and `numeric`;
Section `tone`, `spacing` and `container`; Container `size` and `gutter`;
Stack and Grid `gap`, `direction` and `columns`, per breakpoint with
`{ base, md, lg }`. One solid primary action per view; the rest use
`secondary`, `tonal`, `outlined` or `text`.

## Level 1: global action palette

Only four colors are configurable at runtime: primary, success, error and
info, as six-digit hex. Change them with:

```sh
npx neus init --yes --primary "#0F766E" --error "#B42318"
```

Never write `--color-primary`, `--color-*-light`, `--color-*-dark`,
`--color-text-on-*` or `--color-focus` by hand. ThemeProvider, the library
CSS and the generated `neus.theme.css` own them, and a hand-written rule either loses to
the provider's inline values or drifts from the derived variants.

## Level 2: reusable tokens

Write overrides in `<styles>/neus.overrides.css` (`paths.styles` in
`neus.config.json`), which loads after the library stylesheet. Target the boundary that should own the change:

```css
/* Whole app, active system only. */
:root[data-design-system="carbon"] {
  --button-radius: 4px;
  --input-padding: 12px 16px;
}

/* One feature, wrapped in <ThemeProvider scope="local" className="billing-scope">. */
[data-design-system].billing-scope {
  --card-content-padding: var(--space-6);
}
```

- Use only tokens listed in the component guide's token section or the shared
  foundations (`--space-*`, `--fs-*`, `--radius-*`, `--font-*`,
  `--color-surface*`, `--color-text-*`, `--color-border*`, `--elevation-*`).
- Keep `var()`, `calc()` and `color-mix()` references; do not paste computed
  values.
- Nested ThemeProviders reset recipe tokens. An override on an ancestor does
  not cross a nested boundary; target that boundary too.
- Overriding a token keeps hover, focus and disabled rules working. An inline
  background does not. Prefer the token.

## Level 3: part classes and CSS

Every documented part has a `*ClassName` prop (Input: `labelClassName`,
`inputClassName`, `errorClassName`…; Button: `labelClassName`,
`loaderClassName`). Classes are appended to the built-in ones. Use them with a
project stylesheet for states and pseudo-elements:

```css
.checkout-field .checkout-field-input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
```

Only style parts that appear in the guide's anatomy table. Internal parts
(PickerField, MenuItems, SelectListbox), AG Grid cells and Google Maps
content are not neus contracts; use their own APIs.

## Level 4: part styles

`*Style` props apply inline to one part (`buttonStyle` is Button's root,
`wrapperStyle` is Input's root, `inputStyle` is the native field). Use them
for a single static property such as width or text alignment. They cannot
express `:hover`, `:focus-visible` or `::before`, and on interactive
components a background or color set here overrides every state.

## Your own markup

Headings, text, bands, page width, rows and columns are components: Heading,
Text, Section, Container, Stack and Grid. Markup you still write yourself (a
`blockquote`, a `nav` landmark, a decorative shape) uses the same tokens:
spacing from `--space-*`, type from `--font-*` and the `--type-*` roles,
surfaces and text from the semantic `--color-*` roles. The global helpers
`.neus-eyebrow`, `.neus-mono` and `.neus-gradient-text` exist; use the
gradient at most once per page and only if the system's DESIGN.md allows
promotional treatments.

## Never

- Edit `node_modules`, copy a component's source into the project, or fork a
  component to change its look.
- Write raw hex, rgb or hsl values outside `neus.overrides.css` (and only
  there when a token needs a literal).
- Use `!important`, or select a component through its internal DOM structure.
- Invent token names or a new design system id. If a change cannot be
  expressed with the ladder, say so and propose the closest option.
- Put padding, background or borders on a ThemeProvider `className`: its
  wrapper uses `display: contents` and has no box. Use a real child element.
