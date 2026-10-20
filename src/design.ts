// Internal entry for the `neus` CLI (not a package export): validates and compiles a project's
// derived design system with the same rules the library applies to its six systems.
export { compileDerivedSystem, parseDerivedDocument } from "./design-systems/tooling/design-systems.core";
export type { CompileOptions } from "./design-systems/tooling/design-systems.core";
