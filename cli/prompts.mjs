import { emitKeypressEvents } from "node:readline";
import { styleText } from "node:util";

// Minimal arrow-key prompts in the style of create-vite: a rail on the left, the active
// question open, answered ones collapsed to their value. Node only, no dependencies.

const BAR = "│";
const paint = (output, format, text) => styleText(format, text, { stream: output });

/** Opens the rail with a title. */
export const intro = (title, output = process.stdout) => output.write(`${paint(output, "gray", "┌")}  ${paint(output, "bold", title)}\n${paint(output, "gray", BAR)}\n`);

/** Closes the rail with a last line. */
export const outro = (message, output = process.stdout) => output.write(`${paint(output, "gray", "└")}  ${message}\n\n`);

/**
 * Renders frames for one question until `onKey` returns a value. Each frame replaces the previous
 * one in place; the final frame shows the question collapsed to its answer.
 */
const run = ({ input, output, render, onKey, summary }) => new Promise((resolve, reject) => {
  let lines = 0;
  const draw = (text) => {
    if (lines) output.write(`\x1b[${lines}A\x1b[J`);
    output.write(text);
    lines = text.split("\n").length - 1;
  };
  const raw = Boolean(input.isTTY && input.setRawMode);
  emitKeypressEvents(input);
  if (raw) input.setRawMode(true);
  output.write("\x1b[?25l");
  const finish = (callback) => {
    input.off("keypress", listener);
    if (raw) input.setRawMode(false);
    input.pause();
    output.write("\x1b[?25h");
    callback();
  };
  const listener = (character, key = {}) => {
    if (key.ctrl && key.name === "c") {
      draw(`${paint(output, "red", "■")}  ${summary()}\n${paint(output, "gray", "└")}  ${paint(output, "red", "Cancelled")}\n`);
      finish(() => reject(Object.assign(new Error("Cancelled"), { cancelled: true })));
      return;
    }
    const result = onKey(character, key);
    if (result !== undefined) {
      draw(`${paint(output, "green", "◇")}  ${summary()}\n${paint(output, "gray", BAR)}  ${paint(output, "dim", result.label)}\n${paint(output, "gray", BAR)}\n`);
      finish(() => resolve(result.value));
      return;
    }
    draw(render());
  };
  input.on("keypress", listener);
  input.resume();
  draw(render());
});

/** One choice from a list; options are { value, label, hint }. */
export const select = ({ message, options, initial, input = process.stdin, output = process.stdout }) => {
  let index = Math.max(0, options.findIndex((option) => option.value === initial));
  return run({
    input, output,
    summary: () => message,
    render: () => [
      `${paint(output, "cyan", "◆")}  ${message}`,
      ...options.map((option, at) => {
        const active = at === index;
        const hint = option.hint ? paint(output, "dim", ` ${option.hint}`) : "";
        return `${paint(output, "cyan", BAR)}  ${active ? paint(output, "green", "●") : paint(output, "dim", "○")} ${active ? option.label : paint(output, "dim", option.label)}${active ? hint : ""}`;
      }),
      `${paint(output, "cyan", "└")}  ${paint(output, "dim", "↑/↓ to navigate • Enter: confirm")}`,
      "",
    ].join("\n"),
    onKey: (_, key) => {
      if (key.name === "up" || key.name === "k") index = (index - 1 + options.length) % options.length;
      if (key.name === "down" || key.name === "j") index = (index + 1) % options.length;
      if (key.name === "return" || key.name === "enter") return options[index];
      return undefined;
    },
  });
};

/** Free text; Enter on an empty field keeps `initial`. `validate` returns an error message or nothing. */
export const text = ({ message, initial = "", placeholder = initial, validate = () => undefined, input = process.stdin, output = process.stdout }) => {
  let value = "";
  let error;
  return run({
    input, output,
    summary: () => message,
    render: () => [
      `${paint(output, error ? "yellow" : "cyan", "◆")}  ${message}`,
      `${paint(output, "cyan", BAR)}  ${value || paint(output, "dim", placeholder || " ")}${paint(output, "inverse", " ")}`,
      `${paint(output, "cyan", "└")}  ${error ? paint(output, "yellow", error) : paint(output, "dim", "Enter: confirm")}`,
      "",
    ].join("\n"),
    onKey: (character, key) => {
      if (key.name === "return" || key.name === "enter") {
        const answer = value.trim() || initial;
        error = validate(answer);
        return error ? undefined : { value: answer, label: answer || "–" };
      }
      if (key.name === "backspace") value = value.slice(0, -1);
      else if (character && !key.ctrl && !key.meta && character >= " ") value += character;
      error = undefined;
      return undefined;
    },
  });
};
