import { PassThrough } from "node:stream";
import { describe, expect, it } from "vitest";
import { select, text } from "./prompts.mjs";

// A fake terminal: keys go in, the rendered frames come out (colors off: not a TTY).
const terminal = () => {
  const input = new PassThrough();
  const output = new PassThrough();
  let screen = "";
  output.on("data", (chunk) => { screen += chunk; });
  const press = (...keys) => keys.forEach((key, index) => setTimeout(() => input.write(key), 5 * (index + 1)));
  return { input, output, press, screen: () => screen };
};
const UP = "\x1b[A";
const DOWN = "\x1b[B";
const ENTER = "\r";

describe("prompts", () => {
  it("selects with the arrow keys from the initial option and collapses to the answer", async () => {
    const io = terminal();
    const answer = select({
      message: "Design system",
      initial: "apple",
      options: [{ value: "neus", label: "Neus UI" }, { value: "apple", label: "Apple" }, { value: "carbon", label: "Carbon", hint: "Square" }],
      input: io.input, output: io.output,
    });
    io.press(DOWN, DOWN, UP, ENTER);
    await expect(answer).resolves.toBe("carbon");
    expect(io.screen()).toContain("● Apple");
    expect(io.screen()).toContain("↑/↓ to navigate • Enter: confirm");
    // The last frame collapses the question to its answer, then shows the cursor again.
    expect(io.screen().endsWith("◇  Design system\n│  Carbon\n│\n\u001b[?25h")).toBe(true);
  });

  it("wraps around the list", async () => {
    const io = terminal();
    const answer = select({ message: "Scheme", options: [{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }], input: io.input, output: io.output });
    io.press(UP, ENTER);
    await expect(answer).resolves.toBe("dark");
  });

  it("types text, keeps the initial value on an empty Enter and validates", async () => {
    const io = terminal();
    const kept = text({ message: "Language", initial: "es", input: io.input, output: io.output });
    io.press(ENTER);
    await expect(kept).resolves.toBe("es");

    const typed = terminal();
    const color = text({
      message: "Primary color",
      validate: (value) => !value || /^#[0-9a-f]{6}$/i.test(value) ? undefined : "Use six-digit hex",
      input: typed.input, output: typed.output,
    });
    typed.press("#", "1", "2", "\x7f", "2", "3", "4", "5", "6", ENTER, "7", ENTER);
    await expect(color).resolves.toBe("#123456");

    const invalid = terminal();
    const retried = text({ message: "Primary color", validate: (value) => value.startsWith("#") ? undefined : "Use six-digit hex", input: invalid.input, output: invalid.output });
    invalid.press("x", ENTER, "\x7f", "#", ENTER);
    await expect(retried).resolves.toBe("#");
    expect(invalid.screen()).toContain("Use six-digit hex");
  });

  it("rejects as cancelled on Ctrl+C", async () => {
    const io = terminal();
    const answer = select({ message: "Scheme", options: [{ value: "light", label: "Light" }], input: io.input, output: io.output });
    io.press("\x03");
    await expect(answer).rejects.toMatchObject({ cancelled: true });
    expect(io.screen()).toContain("Cancelled");
  });
});
