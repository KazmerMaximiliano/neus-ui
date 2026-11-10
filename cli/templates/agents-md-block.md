<!-- neus-ui:start (managed by `npx neus init`; edit outside these markers) -->
## Interface with neus-ui

The UI uses neus-ui on {{SYSTEM}}. The design contract is `neus.config.json`.

- neus-ui decides how the interface looks: components, palette, type,
  spacing, theme. Other design guidance, such as the `frontend-design` skill,
  applies through it: palette and type ideas become the brand (`npx neus init`,
  the brand block in `neus.overrides.css`), never hex values, tokens or fonts
  written elsewhere. How the code is written (files, names, types, tests) follows
  this project's code rules or its code-style skill.
- To design, build or restyle any screen, use the `neus-design` skill; to
  review or audit UI, use `neus-audit` (Claude Code: `/neus-design`,
  `/neus-audit`; Codex: `$neus-design`, `$neus-audit`).
- After building a new page or a multi-screen flow, delegate a fresh-eyes
  review to the `neus-reviewer` subagent.
- Any UI change: `npx neus context` and `npx neus docs <Name>` before
  writing, `npx neus lint` after (no P0).
- System and palette: `npx neus init`. Shared look:
  `{{STYLES}}/neus.overrides.css`. Feature specs: `design/specs/`.
- Never edit `node_modules/neus-ui`, copy component source, or write the
  palette variables (`--color-primary*` and similar) by hand.
<!-- neus-ui:end -->
