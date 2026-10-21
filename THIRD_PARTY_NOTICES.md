# Third-party notices

Neus UI is licensed under the [Apache License 2.0](./LICENSE). The package includes or
adapts the material below, under the licenses shown. Runtime dependencies are installed
separately and keep their own licenses; they are listed at the end for reference.

## Included or adapted material

### Vercel Web Interface Guidelines

`skills/neus-audit/references/web-interface-guidelines.md` is a snapshot of `command.md` from
[vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)
(commit `434b7f9`), used by the neus-audit skill when it cannot fetch the live file.

```text
MIT License

Copyright (c) 2025 Vercel Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### awesome-design-md

`skills/neus-design/references/inspiration-index.md` is an index of the DESIGN.md analyses in
[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (commit
`3b60532`): their ids, names, categories and traits.

```text
MIT License

Copyright (c) 2026 VoltAgent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### taste-skill

Rules in `skills/neus-design/references/taste.md` are adapted from
[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill).

```text
MIT License

Copyright (c) 2026 Leonxlnx

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Open Design

Craft rules in `skills/neus-design/references/taste.md` are adapted from the `craft/`
directory of [nexu-io/open-design](https://github.com/nexu-io/open-design), Copyright 2026
Open Design contributors, licensed under the Apache License, Version 2.0 (the same license
text as [LICENSE](./LICENSE)). The adapted rules were rewritten and changed for neus-ui.

### Design system references

The six DESIGN.md files describe local adaptations and cite their public sources (Apple Human
Interface Guidelines, IBM Carbon, Material Design 3, Geist). Type scale values for Carbon and
Material were taken from the published `@carbon/type` (Apache 2.0) and `@material/web`
(Apache 2.0) packages. No fonts, icons or images from those systems are included; the
`neus` CLI only prints links to openly licensed fonts.

## Runtime dependencies

Installed from npm with their own licenses: `@react-google-maps/api` (MIT),
`ag-grid-community` and `ag-grid-react` (MIT), `lucide-react` (ISC), `react-day-picker`
(MIT), `react-spinners` (MIT), `yaml` (ISC) and, optionally, `playwright-core` (Apache 2.0).
