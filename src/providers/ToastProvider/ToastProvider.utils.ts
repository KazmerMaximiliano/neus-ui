let created = 0;

/** Unique within the page for every provider, so ids stay stable across renders. */
export const createToastId = () => {
  created += 1;
  return `toast-${created}`;
};
