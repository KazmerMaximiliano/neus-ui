# Taste: avoiding the generated look

A model left to its defaults builds the average of every interface it has
seen. These rules replace defaults with decisions. The neus-audit skill
checks part of them with searches and screenshots; the rest you check by
looking.

Adapted from taste-skill (MIT, github.com/Leonxlnx/taste-skill), the
OpenDesign craft rules (Apache 2.0) and the neus systems' own do's and
don'ts.

## The system decides first

When the active DESIGN.md defines a device that appears below as a tell (the
Neus pill buttons with tracked uppercase labels, its brand gradient tokens,
a purple Material primary), that is a brand decision: keep it where the
components use it. Do not amplify it in your own markup, and never add a
tell the system does not define. Its Do's and Don'ts decide which devices
your own markup may use (overlines above titles, bordered cards, gradients,
uppercase); when they are silent, leave the device out. When `derivedSystem`
is set (base: `designSystem`), these rules also apply to the system you are
writing.

## Product screens (apps, dashboards, back-office, settings)

| Tell | Instead |
| --- | --- |
| Every block wrapped in a bordered, shadowed card; cards inside cards | Sections separated by space and one tone step; a Card only where the content is a discrete object (a record, a widget, a group of settings), never a Card inside a Card |
| A row of four KPI tiles with icons and invented percentage deltas at the top of every dashboard | The two or three numbers this user acts on, with their real source and period; or no tiles |
| An icon beside every heading and nav item | Icons only where they speed recognition (navigation, row actions) |
| Two or more solid buttons for the same action in one view | One solid primary; the rest `secondary`, `tonal`, `outlined` or `text` |
| Gradient, glow or glass on product chrome; gradient headline text | Flat surfaces. Gradients only if the system's DESIGN.md asks for them, and never on controls |
| Tracked uppercase eyebrow above every section title | Put the information in the title, or drop it |
| Emoji as icons or status | lucide-react icons, or words |
| Decorative charts with made-up data | A real chart of real data, or a designed empty state that says what will appear |
| Badges on everything | Status badges only where status changes what the user does; always with text |
| Grey-on-grey text everywhere | Running text in the full ink; muted color only for secondary notes |
| Hover that makes text lighter | Hover moves the surface, not the ink |
| Monospace for labels and captions | Monospace only for code, IDs and aligned figures (unless the system defines it) |
| "Welcome back, John!", "Elevate your workflow", "Seamless", "Acme Corp", lorem ipsum | Plain, specific language from the domain; realistic names for this context |
| Title Case Everywhere in Spanish | Sentence case; follow the project's language |

### Craft for product screens

- Hierarchy from two or three type sizes per view, weight and space. Borders
  and boxes are the last resort.
- Density follows the task: tables and forms compact, settings standard,
  onboarding relaxed. Pick one per screen and keep it.
- Numbers: tabular figures, right-aligned in columns, formatted with
  `Intl.NumberFormat` / `Intl.DateTimeFormat` in the project's locale.
- Color: the accent marks actions and selection; status colors always come
  with text or an icon.
- Every list has designed empty, loading and error states with a next step.
- One signature move for the product (a type choice, a surface treatment,
  the sidebar), recorded in the spec and repeated consistently. Not a new
  flourish per screen.

## Public pages (landing, marketing, product pages)

For a public page, the composition carries the result more than any single
component. Follow this order:

1. **Inventory the subject.** Eight to twelve facts that belong to this
   product and no competitor: its name, its numbers, its constraint, its
   materials, its real interface. Take them from the brief and the product,
   never from imagination.
2. **Write the argument.** One claim per section with its proof. When the
   brief lists sections, build every one of them: the inventory and the
   argument decide how each section is executed, never whether it exists.
   Without a list, a section with no claim is cut, which is how you avoid the
   stock sequence of hero, logos, three features, testimonial, pricing and
   call to action.
3. **Deal the composition, do not pick it.** With a locked system
   (`derivedSystem` is `null`), palette, type, shape, density and elevation
   belong to the system; deal only the composition and the signature move:

   ```sh
   node <this skill>/scripts/deal-directions.mjs --surface marketing --options 3 --keep palette,type,shape,density,elevation
   ```

   Each option names a curated layout for the hero, the features, the
   testimonials and the call to action. Choose the one that can carry
   something only this subject has, and record why. Palette and type are
   dealt only in None mode, while deriving the system
   ([system-derivation.md](system-derivation.md)). If the
   `design-taste-frontend` skill (taste-skill) is installed you may use its
   layout step instead, never its palette or fonts over a locked system.
4. **Write the idea sentence**: "On this page, [something only this subject
   has] becomes [the device the direction calls for]". If the sentence still
   works with the nearest competitor's name in it, it is a category idea:
   find another.
5. **Write the copy deck before markup.** Headlines fit in two lines at every
   width; one primary action named for what it does, with microcopy beside it
   (what happens next, what it asks of the user); full content in every
   section. Proof follows the sample-content policy in SKILL.md: realistic
   social proof marked `SAMPLE:` in the code, business facts only from the
   brief.
6. **Build, then look.** Run the visual loop in SKILL.md Phase 5
   (`npx neus shot`) and judge the screenshots against the substance rules
   below.

### Substance rules for public pages

A page that loses decoration and gains nothing in its place looks poor: in
blind comparisons people prefer the richer page even when it has a tell or
two. For every device you leave out, something must take its place.

- **Scale.** A headline at the top of the system's type scale (`--fs-4xl` or
  `--fs-5xl` on desktop, at least `--fs-3xl` on phones), a lead paragraph one
  step above the body, running text of at least 16px. Five type sizes at
  most; headlines in two lines or fewer at every width.
- **Width.** Content 1120 to 1280px wide on a 1440px screen, with responsive
  side margins; never one narrow column in the middle of a wide screen.
- **Anchor.** Every section has a visual anchor: a group of cards, a real
  picture or interface, or large type.
- **Bands.** Separate sections with alternating background bands one tone
  step apart and generous vertical space, not with rules.
- **Groups.** Features and testimonials as `Card variant="auto"` in a list:
  the system decides whether a card looks bordered, filled or flat. What
  reads as generated is nesting cards or wrapping every block in one.
- **Content.** Every section complete, with microcopy beside the primary
  action. One ground, one ink, one accent; the accent on the action and at
  most one other thing.
- **Pictures.** Real pictures of the subject or its real interface, never
  generic stock, gradient blobs or fake dashboards built from grey bars
  standing in for the product. Every image local, sized and credited when it
  is not the client's own.
- **Motion.** Motion explains a change or performs the idea; `transform` and
  `opacity` only, with a `prefers-reduced-motion` fallback.

The active DESIGN.md's Do's and Don'ts decide every other device: overlines
above titles, index numbering, glass navigation, gradients, uppercase. When
they are silent, leave the device out.
