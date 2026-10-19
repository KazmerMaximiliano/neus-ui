/** Up to two initials: the first letters of the first and last words, in the name's own script. */
export const initialsOf = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = Array.from(words[0] ?? "")[0] ?? "";
  const last = words.length > 1 ? Array.from(words.at(-1)!)[0] : "";
  return (first + last).toLocaleUpperCase();
};
