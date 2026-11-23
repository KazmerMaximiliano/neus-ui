export const decimalsOf = (step: number) => String(step).split(".")[1]?.length ?? 0;

export const formatNumber = (value: number, locale: string, options: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(locale, options).format(value);

/** Reads text written in the locale: `null` when empty, `undefined` when it is not a number. */
export const parseNumber = (
  text: string,
  locale: string,
  options: Intl.NumberFormatOptions,
): number | null | undefined => {
  if (!text.trim()) return null;
  const parts = new Intl.NumberFormat(locale).formatToParts(-11111.1);
  const symbol = (type: string, fallback: string) =>
    parts.find((part) => part.type === type)?.value ?? fallback;
  const cleaned = text
    .replace(/\s/g, "")
    .split(symbol("group", ",")).join("")
    .replace(symbol("decimal", "."), ".")
    .replace(symbol("minusSign", "-"), "-")
    .replace(/[^\d.-]/g, "");
  const number = cleaned === "" || cleaned === "-" ? NaN : Number(cleaned);
  if (Number.isNaN(number)) return undefined;
  return options.style === "percent" ? number / 100 : number;
};

export const settleNumber = (value: number, precision: number, min?: number, max?: number) =>
  Math.min(max ?? Infinity, Math.max(min ?? -Infinity, Number(value.toFixed(precision))));
