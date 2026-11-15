# Components, pages and templates

## Contents

1. File contract
2. Subcomponents
3. Pages and templates
4. Props
5. Implementation template
6. Markup, accessibility and states
7. Libraries: public API and copy

## 1. File contract

Every component uses a PascalCase folder whose name matches the main file:

| File               | When                                | Holds                                                                                                                    |
| :----------------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `index.ts`         | always                              | Named re-exports of what other modules may import: the component and its public types. See `code-style.md` §4.           |
| `Name.tsx`         | always                              | The implementation and its named export. Nothing else is exported.                                                       |
| `Name.types.ts`    | when it has props or types          | Props, variants and any exported UI type.                                                                                |
| `Name.styles.css`  | when it styles something of its own | The component's BEM block on design tokens, for its own markup or for classes it hands to another component's parts.     |
| `Name.consts.ts`   | when there is static data           | Arrays, defaults, key maps, selectors, stable config, all as named UPPER_SNAKE_CASE exports.                             |
| `Name.utils.ts`    | when there is local logic           | Pure helpers such as class composition, formatting or derivation.                                                        |
| `Name.test.tsx`    | when there is behavior              | The single test file. In the hexagonal profile it lives at the mirrored path under `test/` instead. See `testing.md` §2. |
| `Name.stories.tsx` | with Storybook, or when asked       | One story named after the component, with every prop as a control. See `storybook.md`.                                   |
| `components/`      | when there are owned parts          | Subcomponents. See §2.                                                                                                   |

Each file holds exactly one kind of thing because that keeps every file
predictable: a reviewer knows where the contract, the logic and the styles of
any component live without opening it. It also stops implementation files from
growing into mixed modules.

- Do not create empty or speculative files, and do not invent props, types or
  CSS so that a file has content. A component without props has no
  `.types.ts`, one without static data has no `.consts.ts`, and one that only
  arranges other components, with no markup or classes of its own, has no
  `.styles.css`.
- `.consts.ts` does not hold components, hooks, contexts, refs, derived render
  values or mutable runtime registries. Those stay where they are used.
- Types stay in `.types.ts` even when they are internal. Domain entities and
  feature-wide contracts stay in their domain files (`domain/<feature>.types.ts`
  in a hexagonal app). Do not duplicate them in a component type file.
- In profiles A and B, with two or more test files, all of them go to
  `Name/tests/` (`tests/Name.test.tsx`, `tests/Name.utils.test.ts`, …).
- Other modules import the folder (`../ProjectCard`), never a file inside it.
  Files inside the folder import each other directly, and the component's
  tests may import any of its files.

## 2. Subcomponents

Every rendering part a component owns lives in `Name/components/`. That
includes parts that used to be declared as a second function inside `Name.tsx`.

```text
DataTable/
├── index.ts
├── DataTable.tsx
├── DataTable.types.ts
├── DataTable.styles.css
├── DataTable.test.tsx
└── components/
    ├── TableCell.tsx                small internal part: a single file
    └── TableToolbar/                part with its own styles, logic or tests
        ├── index.ts
        ├── TableToolbar.tsx
        ├── TableToolbar.types.ts
        ├── TableToolbar.styles.css
        └── TableToolbar.test.tsx
```

- A small internal part can be a single file, with no folder and no barrel, that
  reuses its parent's types, styles and behavioral tests. The moment it needs a
  file of its own (types included), it becomes a folder.
- A part with its own types, styles, utilities, tests or stories gets a full
  folder that follows the whole contract, including `index.ts` and the `tests/`
  rule. Either way the parent imports `./components/TableCell` or
  `./components/TableToolbar`.
- A shared internal part has one owning family. Sibling families import it from
  there rather than duplicating it.
- Contexts, hooks, constants and utilities are not rendering parts. They keep
  their own files (see `architecture.md`).
- Moving files into `components/` must not change public imports. When
  consumers need a part, the owner's `index.ts` re-exports it.

## 3. Pages and templates

**Pages** are complete route destinations. A page follows the component contract,
its name ends in `Page`, and it lives in a `pages/` folder:

```text
pages/ProjectsPage/
├── index.ts
├── ProjectsPage.tsx
├── ProjectsPage.types.ts
└── ProjectsPage.styles.css
```

- Pages compose components. Components never import pages.
- A page receives data through props. Reading URL params, calling hooks or use
  cases, navigating and notifying belong to the route layer (a route controller
  or the framework's route entry file). See the environment reference.
- When the framework reserves `pages/` for routing (Next.js `src/pages`, Astro
  `src/pages`, Inertia `resources/js/pages`), that folder holds only the
  framework's thin entry files. The `XPage` components then live in the
  feature's `presentation/pages/` (hexagonal profile) or in `views/` (other
  profiles).

**Templates** define the application-wide arrangement of regions: navigation,
routed content, drawers, headers and footers. They expose slots (`children` or
named props such as `sidebar`) and follow the same contract with a `Template`
suffix (`AppTemplate/AppTemplate.tsx`). Templates do not load data, select
routes, call use cases or contain feature behavior. Global templates live in
`templates/` (`core/presentation/templates/` in the hexagonal profile).

## 4. Props

```ts
// ProjectCard.types.ts
import type { MouseEventHandler } from "react";

export type ProjectCardTone = "default" | "success" | "danger";

export type ProjectCardProps = {
  readonly name: string;
  readonly domain?: string;
  readonly tags?: readonly string[];
  readonly tone?: ProjectCardTone;
  readonly disabled?: boolean;
  readonly onDeploy?: MouseEventHandler<HTMLButtonElement>;
};
```

- Mark every prop `readonly` and every collection `readonly T[]`. Components
  must not mutate what they receive, and the type makes that visible. Sort or
  filter a copy (`[...tags].sort()`).
- Type arrays the component creates and passes to a callback as `T[]`
  (`readonly onChange?: (values: string[]) => void`). The receiver owns the new
  array, and a `readonly string[]` parameter would reject a state setter
  (`onChange={setSelected}`).
- Model variants with string unions and export them when consumers need them
  (`ProjectCardTone`). Never use `enum`.
- Use React's handler types (`MouseEventHandler<HTMLButtonElement>`,
  `ChangeEventHandler<HTMLInputElement>`) and `ReactNode` for slots.
- Destructure in the signature and give optional visual or behavioral props an
  explicit default when a sensible one exists (`tone = "default"`,
  `disabled = false`).
- Never default a callback to a no-op (`onDeploy = () => {}`). An absent
  handler should stay `undefined` so the component can tell "not interactive"
  apart from "interactive". Call it with `onDeploy?.(event)`.
- Discriminated unions (for example, a button that renders `<a>` or `<button>`)
  take `props` whole and destructure after narrowing, because destructuring
  first loses the narrowing.
- Extend native element props only when the component forwards them:
  `ComponentPropsWithoutRef<"button"> & { readonly tone?: … }`.

## 5. Implementation template

```ts
// index.ts
export { ProjectCard } from "./ProjectCard";
export type { ProjectCardProps, ProjectCardTone } from "./ProjectCard.types";
```

```ts
// ProjectCard.consts.ts
export const MAX_VISIBLE_TAGS = 3;
```

```ts
// ProjectCard.utils.ts
import type { ProjectCardTone } from "./ProjectCard.types";

export const getProjectCardClasses = (
  tone: ProjectCardTone,
  disabled: boolean,
): string =>
  [
    "project-card",
    `project-card--${tone}`,
    disabled ? "project-card--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");
```

```tsx
// ProjectCard.tsx
import { useTranslation } from "react-i18next";
import { StatusBadge } from "../StatusBadge";
import type { ProjectCardProps } from "./ProjectCard.types";
import { MAX_VISIBLE_TAGS } from "./ProjectCard.consts";
import { getProjectCardClasses } from "./ProjectCard.utils";
import "./ProjectCard.styles.css";

export const ProjectCard = ({
  name,
  domain,
  tags = [],
  tone = "default",
  disabled = false,
  onDeploy,
}: ProjectCardProps) => {
  const { t } = useTranslation();
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <article className={getProjectCardClasses(tone, disabled)}>
      <header className="project-card__header">
        <h3 className="project-card__name">{name}</h3>
        <StatusBadge tone={tone} />
      </header>
      <p className="project-card__domain">{domain ?? t("projects.noDomain")}</p>
      {visibleTags.length > 0 && (
        <ul className="project-card__tags">
          {visibleTags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <button
        className="project-card__action"
        type="button"
        disabled={disabled}
        onClick={onDeploy}
      >
        {t("projects.deploy")}
      </button>
    </article>
  );
};
```

Notes on the template:

- The i18n call depends on the host (`useTranslations` in next-intl, props in
  Astro islands). See `i18n.md`.
- Class composition with more than one modifier goes to `.utils.ts`. Do not add
  a `classnames`/`clsx` dependency unless the project already has one.
- `type="button"` is always explicit on non-submit buttons.

## 6. Markup, accessibility and states

- Use semantic HTML: landmarks (`header`, `nav`, `main`, `section`, `footer`),
  one `<h1>` per page, and a logical heading order.
- Use links for navigation and buttons for actions. Never put a click handler on
  a `div`.
- Every control has an accessible name. Icon-only buttons get `aria-label` from
  i18n.
- Every behavior works with the keyboard, focus is visible, and ARIA state
  (`aria-pressed`, `aria-expanded`, `aria-current`, `aria-invalid`) mirrors the
  visual state.
- Do not communicate meaning through color alone.
- Handle the disabled, loading, empty and error states the component owns, and
  give users meaningful error messages.
- Interactive feedback (hover, pressed, transitions) is the design's call.
  Implement it in CSS rather than React state, and honor
  `prefers-reduced-motion` (see `styling.md`).
- Supply image dimensions to avoid layout shift.
- Never inject untrusted HTML. `dangerouslySetInnerHTML` requires sanitized
  input and a comment explaining where the HTML comes from.

## 7. Libraries: public API and copy

In a component library (neus-ui style):

- Export each public family from its `index.ts` and from the package entry
  (`src/index.ts`). Internal parts have their own module barrels, but nothing
  public re-exports them.
- Consumer-facing language is configurable. Default labels, aria-labels and
  messages come from props or locale data, never fixed to the developer's
  language.
- Every visual value is a component token (`--project-card-*`) that falls back
  to a shared role token, so themes can restyle the component without touching
  its CSS. See `styling.md`.
- When adding a component, update the library's inventory and docs (README,
  `docs/components/`, `AGENTS.md`) if the project keeps them.
