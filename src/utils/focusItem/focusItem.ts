/**
 * Moves focus among the items a selector finds in a container with the arrow keys, Home and End,
 * wrapping at both ends. Returns whether the key was one of them, so the caller can prevent its
 * default action.
 */
export const focusItem = (
  container: HTMLElement | null,
  key: string,
  selector: string,
  [next, previous]: readonly [string, string] = ["ArrowDown", "ArrowUp"],
) => {
  if (!container || ![next, previous, "Home", "End"].includes(key)) return false;
  const items = [...container.querySelectorAll<HTMLElement>(selector)];
  if (items.length === 0) return true;
  const current = items.indexOf(document.activeElement as HTMLElement);
  const index =
    key === "Home"
      ? 0
      : key === "End"
        ? items.length - 1
        : (current + (key === next ? 1 : -1) + items.length) % items.length;
  items[index].focus();
  return true;
};
