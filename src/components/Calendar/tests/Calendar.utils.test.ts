import { describe, expect, it } from "vitest";
import { getCalendarLocalization, serializeValue } from "../Calendar.utils";

describe("serializeValue", () => {
  it("returns empty string for undefined", () => {
    expect(serializeValue(undefined)).toBe("");
  });

  it("serializes a single Date to ISO string", () => {
    const date = new Date("2024-06-15T12:00:00Z");
    expect(serializeValue(date)).toBe(date.toISOString());
  });

  it("serializes an array of Dates", () => {
    const date1 = new Date("2024-01-01T00:00:00Z");
    const date2 = new Date("2024-01-15T00:00:00Z");
    const result = serializeValue([date1, date2]);
    expect(result).toBe(`${date1.toISOString()},${date2.toISOString()}`);
  });

  it("serializes an empty array", () => {
    expect(serializeValue([])).toBe("");
  });

  it("serializes a complete DateRange", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeValue({ from, to });
    expect(result).toBe(`${from.toISOString()},${to.toISOString()}`);
  });

  it("serializes a DateRange with only from", () => {
    const from = new Date("2024-01-01T00:00:00Z");
    const result = serializeValue({ from, to: undefined });
    expect(result).toBe(`${from.toISOString()},`);
  });

  it("serializes a DateRange with only to", () => {
    const to = new Date("2024-01-31T00:00:00Z");
    const result = serializeValue({ from: undefined, to });
    expect(result).toBe(`,${to.toISOString()}`);
  });
});

describe("getCalendarLocalization", () => {
  it("uses English by default and preserves Gregorian month order", () => {
    const localization = getCalendarLocalization();
    expect(localization.language).toBe("en-US");
    expect(localization.monthNames).toHaveLength(12);
    expect(localization.monthNames[0]).toBe("January");
    expect(localization.monthNames[11]).toBe("December");
  });

  it("localizes navigation and today's date label with native Intl", () => {
    const localization = getCalendarLocalization("es-AR");
    const date = new Date(2026, 9, 15);
    expect(localization.labels.labelPrevious?.(date)).toBe("el mes pasado");
    expect(localization.labels.labelNext?.(date)).toBe("el próximo mes");
    expect(localization.labels.labelDayButton?.(date, { today: true })).toContain("hoy");
    expect(localization.labels.labelDayButton?.(date, { today: false })).not.toContain("hoy");
  });
});
