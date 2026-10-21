# Releasing

[Contributing](./README.md) · [Documentation](../README.md) · [Changelog](../../CHANGELOG.md)

Neus UI is published to npm as `neus-ui`. Releases follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html) and are recorded in
[CHANGELOG.md](../../CHANGELOG.md).

## Versioning policy

The public contract is everything a consumer or an agent can depend on:

| Surface | Examples |
| --- | --- |
| Named exports | Components, types and helpers from `neus-ui`, `neus-ui/sections` and `neus-ui/theme` |
| Package paths | `neus-ui/dist/neus-ui.css` and the entries in `exports` |
| Component API | Props, their types and defaults, rendered roles and labels |
| Documented styling hooks | Part classes in each guide's anatomy table, `*ClassName` and `*Style` props |
| Tokens | Custom properties listed in the guides and `docs/design/tokens.md`, and the DESIGN.md `x-neus` schema |
| CLI | Commands, flags, exit codes, `neus.config.json` fields and the files `neus init` writes |
| AI design kit | Skill names, the commands the skills call and the files they read from the package |

- **Major (2.0.0):** removes or renames anything in the table, changes a prop's type or
  default in an incompatible way, changes the meaning of a token, raises the React or Node
  requirement, or changes the DESIGN.md schema so existing documents stop validating.
- **Minor (1.1.0):** adds a component, section, prop, token, CLI command or flag, or skill
  guidance; changes how a design system looks within its own specification (a padding, a
  color, a radius). Visual changes are listed under "Changed" in the changelog.
- **Patch (1.0.1):** fixes a bug, an accessibility issue, documentation or a skill's wording
  without changing the contract.

Internal files (anything not in the table, such as story files, tests, undocumented classes
and the layout of the generated CSS) can change in any release. Deprecations are announced in a minor
release, with the replacement in the changelog, and removed in the next major.

## Before a release

1. Move the entries under `## [Unreleased]` in `CHANGELOG.md` to a new version heading with
   the date, and update the comparison links at the bottom.
2. Set the version: `npm version <major|minor|patch> --no-git-tag-version` (or edit
   `package.json`), then commit both files.
3. Run every check locally:

   ```bash
   pnpm lint
   pnpm design:check
   pnpm build              # first: the CLI tests import dist/theme.js
   pnpm test:unit
   pnpm test:design-systems
   npm pack --dry-run      # review the file list: dist, cli, skills, agents, docs, notices
   ```

4. Try the package as a consumer: `pnpm pack`, install the tarball in a fresh Vite project,
   run `npx neus init` and `npx neus --version`, and build one screen with `/neus-design`.

## Publish

Push a tag that matches the version. The [release workflow](../../.github/workflows/release.yml)
checks that the tag matches `package.json`, runs the checks, publishes to npm with
[provenance](https://docs.npmjs.com/generating-provenance-statements) and creates the GitHub
release from the changelog section:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The workflow needs a repository secret named `NPM_TOKEN` with publish rights for
`neus-ui` (an npm granular access token). To publish by hand instead, run `npm login`, then
`npm publish --access public` from a clean checkout of the tag; `prepublishOnly` builds the
library first. Pushing the tag afterwards still creates the GitHub release: the workflow skips
a version that is already on npm. Provenance is only available from CI.

## After a release

- Check the package page on npm: version, README, license and provenance badge.
- Install it in a fresh project with `npm install neus-ui` and run `npx neus init`.
- Add a new `## [Unreleased]` section to the changelog if the release removed it.

## Licensing

The project is licensed under the [Apache License 2.0](../../LICENSE). Keep `LICENSE` as the
unmodified license text; the copyright line and trademark note live in
[NOTICE](../../NOTICE). Material copied or adapted from other projects is listed with its full
notice in [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md), and files copied into
consumer projects by `neus init` carry their notice inside the file. Add an entry there
before including anything new from another project.
