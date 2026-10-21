# Security policy

## Supported versions

| Version | Supported |
| --- | --- |
| 1.x | Yes |

Fixes are released as patch versions of the latest minor release.

## Reporting a vulnerability

Do not open a public issue. Report it privately through
[GitHub security advisories](https://github.com/KazmerMaximiliano/neus-ui/security/advisories/new),
with the affected version, steps to reproduce and the impact you expect.

You will get a reply within seven days. Once a fix is released, the advisory is published
with credit to the reporter, unless you ask otherwise.

The `neus` CLI runs locally: `neus init` writes files into your project, and `neus shot` starts
your `dev` script and opens your pages in an installed browser. Reports about those commands
writing outside the project, or running something other than the project's own scripts, are
in scope.
