# Combobox

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A text field that suggests options as you type, from a local list or from results you fetch.

## Usage

```tsx
import { Combobox, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

const COUNTRIES = [
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "uy", label: "Uruguay" },
];

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Combobox name="country" label="País" options={COUNTRIES} emptyLabel="Sin resultados" />
  </ThemeProvider>
);
```

Use a Combobox when typing is faster than scrolling: a long list such as countries or users,
results from a server, or a value that may be new, such as a tag. Use [Select](./Select.md)
for a choice among predefined options people browse, and [RadioGroup](./RadioGroup.md) for two
to five visible options.

With results from a server, turn the local filter off, control the text and pass the
results:

```tsx
const [query, setQuery] = useState("");
const { data = [], isLoading } = useCitySearch(query);

<Combobox
  label="Ciudad"
  options={data}
  filter={false}
  inputValue={query}
  onInputChange={setQuery}
  loading={isLoading}
  loadingLabel="Buscando…"
  onChange={setCity}
/>
```

## Behavior and accessibility

The field is an [Input](./Input.md) with `role="combobox"`, `aria-autocomplete="list"`,
`aria-expanded` and `aria-controls` pointing to a `role="listbox"` named by the label. It
follows the WAI-ARIA combobox pattern with a listbox popup: focus stays in the field and
`aria-activedescendant` points to the option the arrow keys reach, which is drawn with the
hover background and the focus outline.

Typing opens the list and, with `filter` on, keeps the options whose label contains the text,
ignoring case. A click in the field opens it too. While the field shows the chosen label,
every option is offered. ArrowDown and ArrowUp open the list at the chosen option, or move
through the options and wrap; Enter chooses the active one; Escape closes the list and keeps
the text. A click on an option chooses it and leaves focus in the field.

When the field loses focus, or on Enter with no active option, the text settles: an option
whose label matches it exactly, ignoring case, is chosen; erased text clears the value; other
text becomes the value with `allowCustomValue`, or gives way to the last choice. `onChange`
receives the option's value, or the text with `allowCustomValue`; `onInputChange` receives
the text as it changes.

`loading` shows a decorative [Spinner](./Spinner.md) at the end of the field and marks the
list busy. When there are no options to show, a status line says `loadingLabel` or
`emptyLabel`. With `name`, a hidden input submits the value, not the label. `readonly`
keeps the text without opening the list. The list needs JavaScript, so the field lives in a
hydrated client component.

## Props

See [the type source](../../src/components/Combobox/Combobox.types.ts) and
[implementation](../../src/components/Combobox/Combobox.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `options` | `readonly { value?: string \| null; label: string }[]` | Required | Suggestions; the results themselves with `filter={false}` |
| `value` | `string` | Omitted | The chosen value (controlled) |
| `defaultValue` | `string` | `""` | Initial value (uncontrolled) |
| `onChange` | `(value: string) => void` | Omitted | Called when the value changes |
| `inputValue` | `string` | Omitted | The text in the field (controlled) |
| `onInputChange` | `(text: string) => void` | Omitted | Called with the text as it changes |
| `filter` | `boolean` | `true` | Narrows the options to the typed text |
| `allowCustomValue` | `boolean` | `false` | Keeps text that matches no option as the value |
| `loading` | `boolean` | `false` | Spinner in the field, busy list and the loading text |
| `emptyLabel` | `string` | `"No results"` | Shown when nothing matches, in the project's language |
| `loadingLabel` | `string` | `"Loading…"` | Shown while loading without options, in the project's language |
| `name` | `string` | Omitted | Submits the value through a hidden input |
| `listClassName`, `listStyle` | `string`, `CSSProperties` | Omitted | `.select__popover.combobox__list` |
| `optionClassName`, `optionStyle` | `string`, `CSSProperties` | Omitted | Each `.select__option.combobox__option` |
| `statusClassName`, `statusStyle` | `string`, `CSSProperties` | Omitted | `.select__empty.combobox__status` |
| Input props | [Input](./Input.md#props) | Optional | `label`, `description`, `error`, `placeholder`, `variant`, `labelPlacement`, `size`, `required`, `disabled`, `readonly`, `prefix`, `suffix`, part hooks and native attributes, except `type`, `min`, `max`, `step`, `role` and `ref` |

`className` lands on the Input wrapper, which also carries `.combobox`. A `suffix` gives way
to the Spinner while loading. Your `onKeyDown`, `onClick` and `onBlur` run before the
Combobox's own handling; call `preventDefault()` in `onKeyDown` to skip it.

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Hooks do not create a part whose
rendering condition is false. The field's parts are [Input's](./Input.md#anatomy-and-per-part-customization),
and the list reuses [Select's](./Select.md) panel and option styles.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.input__wrapper.combobox` | `div` | `className` | `wrapperStyle` | `Always` |
| `.select__popover.combobox__list` | `div` with `popover="manual"`; also `.popover-panel` | `listClassName` | `listStyle` | `Always`; shown while open |
| `[role="listbox"]` | `div` inside the list | None | None | `Always` |
| `.select__option.combobox__option` | `div` with `role="option"` | `optionClassName` | `optionStyle` | One per option shown while open |
| `.select__empty.combobox__status` | `div` with `role="status"` | `statusClassName` | `statusStyle` | Open with no options to show |

State selectors: `.select__option--selected` with `aria-selected="true"` on the chosen
option, and `.combobox__option--active` on the one the arrow keys reach. Use the
[stylesheet](../../src/components/Combobox/Combobox.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Combobox label="Etiquetas" options={tags} allowCustomValue listClassName="tag-list" />
```

```css
.tag-list {
  --select-list-max-height: 320px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

Combobox has no recipe of its own. The field reads the `input` recipe and the list reads the
`select` and `overlay` recipes that all six systems supply in light and dark modes, so it
matches the Inputs and Selects of its form. See the [Input](./Input.md#css-token-reference)
and [Select](./Select.md#css-token-reference) guides for every token.

| Token | Used for |
| --- | --- |
| `--select-list-max-height` | Height of the list before it scrolls |
| `--overlay-item-hover-background`, `--overlay-item-hover-color` | The active option |
| `--overlay-focus-color` | The active option's outline |
| `--overlay-item-selected-background`, `--overlay-item-selected-color` | The chosen option |

### Shared dependencies and runtime values

`--input-*`, `--select-*` and `--overlay-*`. While open, the list carries the placement values
of the [Popover](./Popover.md) panel; it lines up with the whole field (`.input__control`) and
takes its width from `--popover-anchor-width`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --select-list-max-height: 200px;
}
```

## Storybook and related guides

The single Combobox story exposes props as controls with a list of countries. Related:
[Input](./Input.md), [Select](./Select.md), [Spinner](./Spinner.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
