# Inspiration

References give the design concepts that defaults do not. Use them to
derive a system, to give a public page its direction, or when the user
names a product whose feel they want. Take concepts, never identities.

## Sources

| Source | What it holds | How to read it |
| --- | --- | --- |
| [inspiration-index.md](inspiration-index.md) | Id, name, category and traits of each DESIGN.md in VoltAgent/awesome-design-md (MIT) | Search it for the brief's traits: domain, tone, density, light or dark |
| Full analysis | The complete DESIGN.md of one reference | Fetch the raw URL in the index (network only); save it under `design/inspiration/<id>.md` so later sessions reuse it |
| The six neus systems | Complete specifications already installed | `node_modules/neus-ui/src/design-systems/<id>/DESIGN.md`; the offline fallback |
| User material | Screenshots, URLs, brand guides the user provides | Read directly; it outranks every other source |

The index is a shortlist tool. Do not fetch the whole collection: one to
three documents per brief.

## Procedure

1. **Select** one to three references whose traits match the brief: domain,
   tone, density, light or dark. Prefer references from a different domain
   that share the tone; they produce less familiar results than direct
   competitors.
2. **Extract concepts**, three to six per reference, each written as a
   transferable rule, for example:
   - "One chromatic accent on near-black; every other color is a gray step."
   - "Depth from a 1px ring instead of shadows."
   - "Display type tracked tight (-0.02em) at a single heavy weight."
   - "Controls are square; only avatars are round."
3. **Translate** each concept to neus levers: palette roles, `--type-*` and
   `--font-*` tokens, the `rounded` scale, `--elevation-*`, recipe tokens.
   A concept with no lever is dropped or noted as a limit.
4. **Transform** before you use it. Combine concepts from at least two
   sources, or change at least one of hue family, type class or shape scale
   relative to the reference.
5. **Record provenance** in the derived DESIGN.md Overview or the feature
   spec: "Concept from <reference>: <rule>".

## Never

- Reproduce a brand's signature combination: its exact accent color with its
  typeface, its logo, wordmark, illustration style or product names.
- Use proprietary typefaces named in a reference. Map them to an open face of
  the same class and say which.
- Copy prose or token files wholesale into the project.
- Present a result as the referenced company's design. The references are
  analyses of public sites, not official assets.
