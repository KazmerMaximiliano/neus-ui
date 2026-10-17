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
tell the system does not define. When `designSystem.base` is set (a derived
system), these rules also apply to the system you are writing.

## Product screens (apps, dashboards, back-office, settings)

| Tell | Instead |
| --- | --- |
| Every block wrapped in a bordered, shadowed card; cards inside cards | Sections separated by space and one tone step; a Card only where the content is a discrete object |
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

Neus targets application screens. For a public page, the composition carries
the result more than the components do. Follow this order:

1. **Inventory the subject.** Eight to twelve facts that belong to this
   product and no competitor: its name, its numbers, its constraint, its
   materials, its real interface.
2. **Write the argument.** One claim per section with its proof. A section
   without a claim is deleted, which is how you avoid the stock sequence of
   hero, logos, three features, testimonial, pricing and call to action.
3. **Deal a direction, do not pick one.** If the `design-taste-frontend`
   skill (taste-skill) is installed, use its direction step and map the
   neus tokens onto its roles. Otherwise run
   `node <this skill>/scripts/deal-directions.mjs --surface marketing --options 3`
   and choose the one that can carry something only this subject has.
   Record why.
4. **Write the idea sentence**: "On this page, [something only this subject
   has] becomes [the device the direction calls for]". If the sentence still
   works with the nearest competitor's name in it, it is a category idea:
   find another.
5. **Write the copy deck before markup.** Headlines fit in two lines at every
   width; one primary action named for what it does; full content in every
   section. Never invent proof: no customers, quotes, logos or statistics.
6. **Build, look once.** Take one round of screenshots at 390, 768 and
   1440 px (see neus-audit), look at them and fix the three worst problems.

### House rules for public pages

- Headlines two lines or fewer at every width; five type sizes at most.
- One ground, one ink, one accent; the accent on the action and at most one
  other thing.
- No eyebrows, pill badges above headlines, index numbering (01 / 02 / 03),
  icon-topped feature card rows, hairline grids, glass navigation, gradient
  blobs or fake dashboards built from grey bars.
- Real pictures of the subject or its real interface, never generic stock
  standing in for the product. Every image local, sized and credited when it
  is not the client's own.
- Motion explains a change or performs the idea; `transform` and `opacity`
  only, with a `prefers-reduced-motion` fallback.
