export const getWeekDays = (start: Date): Date[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export const getCenterDate = (date: Date): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() - 3);
  d.setHours(0, 0, 0, 0);
  return d;
}

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}
