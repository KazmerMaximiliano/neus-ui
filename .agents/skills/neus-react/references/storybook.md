# Storybook stories

Verified against Storybook 10.6 in November 2026.

## Contents

1. When to write stories
2. Setting up Storybook
3. The story format
4. Components with subcomponents
5. Special cases
6. Hosts
7. Validation

## 1. When to write stories

- **Storybook is configured** (a `.storybook/` folder, or `storybook` in
  `devDependencies`): every component, template and page view the change
  creates gets a story, and a component whose props change gets its story
  updated in the same change. Do not add stories to components the task does
  not touch.
- **Storybook is not configured:** write stories only when the user asks for
  stories or for Storybook, and set Storybook up first (§2). Never add it on
  your own initiative.
- No stories for route entry files (`app/**/page.tsx`, `.astro` files, Inertia
  page entries), providers, hooks, or internal single-file parts, which appear
  in their parent's story.
- A project that already has stories keeps its conventions (titles, decorators,
  story format). Match them in new stories.

## 2. Setting up Storybook

Only when §1 says so. Use the official installer. It detects the framework,
and it skips its questions when an agent runs it:

```bash
npm create storybook@latest -- --features docs --no-dev --package-manager=<npm|pnpm|yarn>
```

- `--features docs` installs `storybook`, the framework package and
  `@storybook/addon-docs`, which is all that stories with docs need. Add
  `test` (Vitest browser tests with Playwright) or `a11y` only when the user
  asks for them. `--no-dev` keeps the installer from starting the dev server.
  Take `--package-manager` from the project's lockfile.
- If the installer asks for a builder (it does in Astro), run it again with
  `--builder vite`.
- Storybook's React packages need `typescript` as a peer dependency. If the
  project does not list `typescript` itself, add the version its tooling
  supports as a dev dependency first. Otherwise npm installs the newest major,
  and a tool that rejects it breaks: `astro check` refuses TypeScript 7.
- The installer writes `.storybook/main.ts`, `.storybook/preview.tsx` and the
  `storybook` and `build-storybook` scripts. It also adds example stories in
  `src/stories/` and can leave a `debug-storybook.log`. Delete both: nobody
  asked for the examples, and they do not follow these conventions.
- In `.storybook/preview.tsx`, import the global stylesheets the app entry
  imports, in the same order, so stories render with the real tokens. Add a
  decorator for each provider the components need (§6). With neus-ui, how the
  preview is themed is neus-design's call (its `references/frameworks.md`):
  load its stylesheets in its order and theme the stories the way the app root
  does.
- `.storybook/` files are configuration. They keep Storybook's names and
  default exports and stay outside the folder contract.
- List the new dependencies and scripts in the report.

## 3. The story format

Each component gets one file, `Name.stories.tsx`, beside the component in every
profile. That includes profile C: stories document the component rather than
test it, so they stay out of the mirrored `test/` tree, and the `stories` glob
the installer writes in `.storybook/main.ts` already finds them in `src/`. The
file holds exactly one story:

```tsx
// ProjectCard.stories.tsx
import { ProjectCard as ProjectCardComponent } from "./ProjectCard";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ProjectCardComponent> = {
  title: "Components/ProjectCard",
  component: ProjectCardComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Project name, shown as the card heading",
    },
    domain: {
      control: "text",
      description: "Public domain; a fallback text shows when it is missing",
    },
    tags: { control: "object", description: "Technologies shown as tags" },
    tone: {
      control: "select",
      options: ["default", "success", "danger"],
      description: "Status tone of the card",
    },
    disabled: { control: "boolean", description: "Disables the deploy button" },
    onDeploy: {
      action: "deployed",
      description: "Called when the deploy button is clicked",
    },
  },
};

export const ProjectCard: StoryObj<typeof ProjectCardComponent> = {
  args: {
    name: "Portfolio",
    domain: "portfolio.example.com",
    tags: ["astro", "react"],
    tone: "default",
    disabled: false,
  },
};

export default meta;
```

| Rule                     | Detail                                                                                                                                                                                                                                             |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One story                | Export a single story named exactly like the component, and import the component as `NameComponent`. Storybook lists the component once, with its Docs page, and the controls explore every state. No `Disabled`, `Loading` or `Outlined` stories. |
| Every prop in `argTypes` | Each prop has a `control` and a `description` of what it does, in English.                                                                                                                                                                         |
| Every prop in `args`     | Each prop that is not a callback has a sensible default, so the first render shows a realistic component.                                                                                                                                          |
| Callbacks                | `action: "eventName"` in `argTypes`, never a value in `args`. Storybook creates the action only for an arg that `args` leaves out.                                                                                                                 |
| Docs                     | `tags: ["autodocs"]` in the meta.                                                                                                                                                                                                                  |
| Layout                   | `parameters: { layout: "centered" }`. Use `"padded"` for wide components and sections, and `"fullscreen"` for templates and page views.                                                                                                            |
| Title                    | Follow the titles the project already uses. Otherwise use `<Group>/<Name>`, where the group is the responsibility folder (`Components`, `Templates`, `Views`) or, in profile C, the feature (`Projects`).                                          |
| Meta                     | The default export, written last (`export default meta;`). Storybook requires it, and it is one of the default exports the skill allows.                                                                                                           |
| Types                    | `Meta` and `StoryObj` come from the framework package named in `.storybook/main.ts` (`@storybook/react-vite`, `@storybook/nextjs-vite`), typed with `typeof NameComponent`.                                                                        |

Controls by prop type:

| Prop type                                       | Control                                                                              |
| :---------------------------------------------- | :----------------------------------------------------------------------------------- |
| `string`                                        | `control: "text"`                                                                    |
| `number`                                        | `control: "number"`                                                                  |
| `boolean`                                       | `control: "boolean"`                                                                 |
| String union                                    | `control: "select", options: [...]`; reuse the component's `.consts.ts` array if any |
| Arrays and plain objects                        | `control: "object"`                                                                  |
| `ReactNode` slots, components, render functions | `control: false`; set the slot's content in `args`                                   |
| Callbacks                                       | `action: "eventName"`                                                                |

- Story args are sample data, like test data: write them in the story,
  realistic and in the project's language. The rule against hardcoded copy
  covers the application, not its stories. A component that translates its own
  copy gets it from the i18n decorator in the preview.
- Imports follow the core order, with the component and the parts the story
  composes first, then `import type`, then CSS last. Inside the folder, the
  story imports files directly (`./ProjectCard`).
- No inline styles in stories either. A frame the preview needs (a width, a
  list around an `li`) is a class in `Name.stories.css` beside the story, with
  the block `name-story`. Story-only assets are `Name.stories.<ext>`. Neither
  is part of the component.

## 4. Components with subcomponents

Some components are a family of public parts, such as a Card with CardHeader
and CardContent. In that case every public part gets its own story, and the
parent's story shows the whole family:

```text
Card/
├── index.ts                     re-exports Card and its public parts
├── Card.tsx
├── Card.types.ts
├── Card.stories.tsx             "Components/Card": the family composed
├── Card.stories.css             preview frame shared by the family's stories
└── components/
    ├── CardHeader/
    │   ├── index.ts
    │   ├── CardHeader.tsx
    │   ├── CardHeader.types.ts
    │   └── CardHeader.stories.tsx   "Components/Card/CardHeader"
    └── CardContent/
        └── …                        same shape
```

```tsx
// Card.stories.tsx (the parent)
export const Card: StoryObj<typeof CardComponent> = {
  args: {
    variant: "outlined",
    children: (
      <>
        <CardHeader>Weekly report</CardHeader>
        <CardContent>Twelve deployments, no failed builds.</CardContent>
      </>
    ),
  },
  render: (args) => (
    <div className="card-story">
      <CardComponent {...args} />
    </div>
  ),
};
```

```tsx
// components/CardHeader/CardHeader.stories.tsx (a part)
import { Card } from "../../Card";
import { CardHeader as CardHeaderComponent } from "./CardHeader";
import type { Meta, StoryObj } from "@storybook/react-vite";
import "../../Card.stories.css";

const meta: Meta<typeof CardHeaderComponent> = {
  title: "Components/Card/CardHeader",
  component: CardHeaderComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Header content, usually the title",
    },
  },
};

export const CardHeader: StoryObj<typeof CardHeaderComponent> = {
  args: { children: "Weekly report" },
  render: (args) => (
    <div className="card-story">
      <Card>
        <CardHeaderComponent {...args} />
      </Card>
    </div>
  ),
};

export default meta;
```

- The parent's story puts the parts in `args.children`, with `control: false`
  and a description that names them, so its Docs page shows the complete
  component.
- A part's story is titled under the parent (`Components/Card/CardHeader`), so
  Storybook groups the family in one tree. It renders the part inside its
  parent, so the part is seen in context, and its controls are the part's own
  props.
- A part with a story is a folder module (`components.md` §2). Internal parts
  that the owner's `index.ts` does not export get no story; the parent's story
  shows them.

## 5. Special cases

- **Controlled state** (`isOpen`, `value`, `checked`): write `render` as a named
  function and keep the control in sync with `useArgs`, so the component and
  the Controls panel never disagree. Do not add React state to the story for
  this.

  ```tsx
  import { useArgs } from "storybook/preview-api";
  // …
  export const Dialog: StoryObj<typeof DialogComponent> = {
    args: { isOpen: true, title: "Delete project?" },
    render: function Render({ onClose, ...args }) {
      const [, updateArgs] = useArgs<DialogProps>();
      const close = () => {
        updateArgs({ isOpen: false });
        onClose?.();
      };
      return <DialogComponent {...args} onClose={close} />;
    },
  };
  ```

- **Discriminated union props** (a button that becomes a link with `href`): the
  controls need one flat shape. Declare `NameStoryArgs` in `Name.types.ts`
  without re-exporting it from `index.ts`, and type the meta and the story with
  it. Leave `component` out of the meta, with a comment that says why, and
  narrow in `render`.
- **Story-only controls** (a theme picker, a frame width): also a
  `NameStoryArgs` type that extends the props. Destructure those args in
  `render` and pass the rest to the component.
- **A component without props** gets the same story with no `args` and no
  `argTypes`.
- **Hooks that cannot run in Storybook** (they need a server, a framework
  context or a real session): automock their module in `.storybook/preview.tsx`
  with `sb.mock(import("../src/path/to/module.ts"))` from `storybook/test`.
  The path is relative to the preview file, includes the extension and uses no
  alias. Then set the return value in the meta's or the story's `beforeEach`
  with `mocked(hook).mockReturnValue(...)`, importing `mocked` from
  `storybook/test` and the hook from its own module file.

## 6. Hosts

| Host               | Framework package                          | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vite SPA           | `@storybook/react-vite`                    | Components that use the router get a decorator with React Router's `MemoryRouter`. With i18next, import the i18n module in the preview (`import "../src/i18n";`), as the entry does.                                                                                                                                                                                                                                                                                                      |
| Next.js App Router | `@storybook/nextjs-vite`                   | The installer picks it unless the project has a custom Webpack or Babel config; then keep `@storybook/nextjs`. Set `parameters: { nextjs: { appDirectory: true } }` in the preview. Story client components and `XPage` views, which take their data as props. Never `app/**` files or async Server Components: Storybook's RSC support is experimental, so leave `experimentalRSC` off. With next-intl, add a decorator with `NextIntlClientProvider` and the default locale's messages. |
| Astro              | `@storybook/react-vite` (`--builder vite`) | Storybook has no official Astro framework. Stories cover the React islands only; `.astro` files get none. Islands receive their copy as props, so stories need no i18n decorator.                                                                                                                                                                                                                                                                                                         |
| Laravel + Inertia  | `@storybook/react-vite`                    | Story components and `XPage` views with props. `usePage()` throws outside the Inertia app, and Inertia does not export its page context. Automock the `useTranslations` bridge and any hook that reads shared props (§5).                                                                                                                                                                                                                                                                 |

## 7. Validation

- The typecheck covers stories when `tsconfig` includes their folder.
- Run `build-storybook` (or the project's equivalent script) after setting
  Storybook up and after adding or changing stories. It fails on a story that
  does not compile or import. If the project has a Storybook Vitest project,
  run it too.
